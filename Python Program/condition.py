name = input("Name: ")
num = int(input("Enter Number:"))

if name: 
    print(f"hello {name}")
else: 
    print("no Input")

if num > 0:
    print("Number is positive")
elif num < 0:
    print("Number is negative")
else: 
    print("Number is Zero")