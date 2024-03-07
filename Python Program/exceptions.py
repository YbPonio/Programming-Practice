import sys

try:
    x = int(input("enter x:"))
    y = int(input("enter y:"))
except ValueError:
    print("Error: Only Accept Number!")
    sys.exit(1)

try:
    result = x / y
except ZeroDivisionError:
    print("Error: Cant divided by 0")
    sys.exit(1)


print(f"{x} / {y} is equal to {result}")