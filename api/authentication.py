import pyrebase

config = {
    'apiKey': "AIzaSyCIthqniauFwsOxsM1M2mcMGSce-ES3HUM",
    'authDomain': "authpy-ca433.firebaseapp.com",
    'projectId': "authpy-ca433",
    'storageBucket': "authpy-ca433.appspot.com",
    'messagingSenderId': "126137146775",
    'appId': "1:126137146775:web:fb240b8aee12416debf8d2",
    'measurementId': "G-VEQ3NCBQ9L",
    'databaseURL': "https://authpy-ca433-default-rtdb.firebaseio.com/"
  }

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

"""email = '2yashas2@gmail.com'
password = '123'

user = auth.sign_in_with_email_and_password(email, password)
print(user)

auth.send_password_reset_email(email)
"""