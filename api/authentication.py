import pyrebase

config = {
    #enter firebase details and configs
  }

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
