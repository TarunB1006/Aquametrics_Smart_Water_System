from flask import Flask, redirect, render_template, request, session,json
from .util.database import db, User
import calendar
from passlib.hash import sha256_crypt

import datetime
from datetime import datetime, timedelta
from collections import OrderedDict
from pyrebase import pyrebase
from collections import defaultdict

day_names = {0: 'Monday', 1: 'Tuesday', 2: 'Wednesday', 3: 'Thursday', 4: 'Friday', 5: 'Saturday', 6: 'Sunday'}
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = #create your cloud database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your_secret_key'
FIREBASE_URL = #create a firebase app and paste it's link here
FIREBASE_NODE = "flow_data.json"
FIREBASE_API= #paste the api of the firebase app

db.init_app(app)

with app.app_context():
    db.create_all()

# enter firebase deets and credentials 
config = {
}

firebase = pyrebase.initialize_app(config)
dbf = firebase.database()

auth = firebase.auth()


@app.route('/', methods=['GET', 'POST'])
def main():
    if 'user' in session:
        return redirect("/dashboard")
    return render_template('main.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        print("gg")
        row =User.query.filter_by(email=email).first()
        print(row)

        if row and sha256_crypt.verify(password, row.password):
            session['email'] = email
            session['name']=row.name
            return redirect("/dashboard")
        else:
            return render_template('login.html')
    else:
        return render_template('login.html')

@app.route('/signup',methods=['GET', 'POST'])
def signup():
     if request.method == 'POST':
        email = request.form['email']
        name = request.form['name']
        phone_number = request.form['phone']
        password = request.form['password']
        hashed_password = sha256_crypt.hash(password)
        print(email)
        user=User(email=email,name=name,phone_number=phone_number,password=hashed_password)
        print(user)
        db.session.add(user)
        db.session.commit()
        return redirect('/')
     else:
        return render_template("signup.html")

@app.route('/dashboard')
def dashboard():
    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

    start_of_day = int(today.timestamp() * 1000)
    end_of_day = int((today + timedelta(days=1)).timestamp() * 1000) - 1

    start_of_week = int((today - timedelta(days=today.weekday())).timestamp() * 1000)
    end_of_week = int((today + timedelta(days=7-today.weekday())).timestamp() * 1000) - 1

    start_of_month = int(today.replace(day=1).timestamp() * 1000)
    end_of_month = int((today.replace(day=1, month=today.month % 12 + 1) - timedelta(days=1)).timestamp() * 1000)

    # Calculate start and end timestamps for the current year
    start_of_year = int(today.replace(month=1, day=1).timestamp() * 1000)
    end_of_year = int(today.replace(month=12, day=31).timestamp() * 1000)

    flowrate = dbf.child("flow_data").get().val()
    day_data = []
    week_data = []
    month_data = []
    year_data = []
    current_day_usage=0
    current_week_usage=0
    current_year_usage=0
    current_month_usage=0
    count=0
    for obj in flowrate.values():
        for key, value in obj.items():
            if key == "timestamp":
                if start_of_day < value < end_of_day:
                    if(obj.get("turbidity_value")!=None):
                        count+=1
                        day_data.append({
                        "timestamp": value,
                        "flow_volume": obj.get("flow_volume"),
                        "turbidity": 105.0/obj.get("turbidity_value")
                        })
                   
                    else:
                        day_data.append({
                        "timestamp": value,
                        "flow_volume": obj.get("flow_volume"),
                        "turbidity": 0.7
                        })
                    current_day_usage+=obj.get("flow_volume")
                if start_of_week < value < end_of_week:
                    if(obj.get("turbidity_value")!=None):
                        week_data.append({
                        "timestamp": value,
                        "flow_volume": obj.get("flow_volume"),
                        "turbidity": 105.0/obj.get("turbidity_value")
                        })
                   
                    else:
                        week_data.append({
                        "timestamp": value,
                        "flow_volume": obj.get("flow_volume"),
                        "turbidity": 0.7
                        })
                    current_week_usage+=obj.get("flow_volume")
                        

                if start_of_month < value < end_of_month:
                    if(obj.get("turbidity_value")!=None):
                        month_data.append({
                        "timestamp": value,
                        "flow_volume": obj.get("flow_volume"),
                        "turbidity": 105.0/obj.get("turbidity_value")
                        })
                    else:
                        month_data.append({
                        "timestamp": value,
                        "flow_volume": obj.get("flow_volume"),
                        "turbidity": 0.7
                        })
                    current_month_usage+=obj.get("flow_volume")
                    
                if start_of_year < value < end_of_year:
                    if(obj.get("turbidity_value")!=None):
                        year_data.append({
                        "timestamp": value,
                        "flow_volume": obj.get("flow_volume"),
                        "turbidity": 105.0/obj.get("turbidity_value")
                        })
                    else:
                        year_data.append({
                        "timestamp": value,
                        "flow_volume": obj.get("flow_volume"),
                        "turbidity": 0.7
                        })
                    current_year_usage+=obj.get("flow_volume")
    week_data_grouped = defaultdict(list)

# Iterate through week_data and group by day
    for dt in week_data:

        timestamp = dt['timestamp']

            # Convert timestamp to datetime object
        day = day_names[datetime.fromtimestamp(timestamp / 1000).weekday()]
        
            # Append flow volume to the corresponding day in the dictionary
        week_data_grouped[day].append(dt['flow_volume'])

# Calculate the total flow volume for each day
    for day, flow_volumes in week_data_grouped.items():
        week_data_grouped[day] = round(sum(flow_volumes), 2)
    week_data_grouped = dict(week_data_grouped)
     
        


    print("year_data")
    print(year_data)
    print("month data")
    print(month_data)
    print("day data")
    print(day_data)

    print("COUNT")
    print(count)
    print("week grouped data")
    print(week_data_grouped)
    return render_template('dashboard.html',current_day_usage=round(current_day_usage,2),current_week_usage=round(current_week_usage,2),current_month_usage=round(current_month_usage,2),day_data=day_data,week_data=week_data,month_data=month_data,year_data=year_data,week_data_grouped=week_data_grouped)


@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
