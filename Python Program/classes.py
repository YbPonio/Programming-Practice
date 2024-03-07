# Creating new classes

class Point():
    def __init__ (self, x, y):
        self.x = x
        self.y = y

p = Point(2, 4)
x = Point(1, 3)

print(p.x)
print(x.x)

# Example

class Flight():
    def __init__(self, capacity):
        self.capacity = capacity
        self.passengers = []

    def add_passenger(self, name):
        if not self.open_seats():
            return False
        self.passengers.append(name)
        return True

    def open_seats(self):
        return self.capacity - len(self.passengers)

flight = Flight(2)

names = ["Harry", "Hermione", "Ron", "Draco"]
for name in names:
    if flight.add_passenger(name):
        print(f"The Passenger {name} is added to the Flight")
    else:
        print(f"No available seats for {name}")