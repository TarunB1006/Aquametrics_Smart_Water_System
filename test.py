from datetime import datetime, timedelta

today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

start_of_day = int(today.timestamp() * 1000)
end_of_day = int((today + timedelta(days=1)).timestamp() * 1000) - 1

print("HI")
print(start_of_day)
print(end_of_day)