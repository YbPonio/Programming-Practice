def decorators(f):
    def wrapper():
        print("About to run the Function..")
        f()
        print("Done with the Function")
    return wrapper

@decorators
def hello():
    print("Hello World")

hello()