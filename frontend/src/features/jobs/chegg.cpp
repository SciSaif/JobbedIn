#include <iostream>
using namespace std;

class Shape {
    double area;

   public:
    virtual void calculateArea() = 0;

    double getArea() {
        return area;
    }

    void setArea(double _area) {
        this->area = _area;
    }

    void draw() {
        cout << "the shape is drawn" << endl;
    }
};

class Circle : public Shape {
    int centerX, centerY, radius;

   public:
    Circle(int centerX, int centerY, int radius) {
        this->centerX = centerX;
        this->centerY = centerY;
        this->radius = radius;
        calculateArea();
    }

    int getCenterX() {
        return centerX;
    }

    int getCenterY() {
        return centerY;
    }

    int getRadius() {
        return radius;
    }

    void setCenterX(int centerX) {
        this->centerX = centerX;
    }

    void setCenterY(int centerY) {
        this->centerY = centerY;
    }

    void calculateArea() {
        double area = radius * radius * 3.14f;
        setArea(area);
    }
};

class Rectangle : public Shape {
    int centerX, centerY, width, height;

   public:
    Rectangle(int centerX, int centerY, int width, int height) {
        this->centerX = centerX;
        this->centerY = centerY;
        this->width = width;
        this->height = height;
        calculateArea();
    }

    int getCenterX() {
        return centerX;
    }

    int getCenterY() {
        return centerY;
    }

    int getWidth() {
        return width;
    }

    int getHeight() {
        return height;
    }

    void setCenterX(int centerX) {
        this->centerX = centerX;
    }

    void setCenterY(int centerY) {
        this->centerY = centerY;
    }

    void setWidth(int width) {
        this->width = width;
    }

    void setHeight(int height) {
        this->height = height;
    }
    void calculateArea() {
        double area = width * height;
        setArea(area);
    }
};

int main() {
    // creating an array of Shape pointers that will store the references of Circle and Rectangle Objects
    Shape* shapes[10];

    Circle c1(4, 4, 2), c2(2, 8, 3), c3(8, 2, 4);
    Rectangle r1(15, 1, 2, 3), r2(1, 18, 3, 4);

    shapes[0] = &c1;
    shapes[1] = &c2;
    shapes[2] = &c3;
    shapes[3] = &r1;
    shapes[4] = &r2;

    cout << shapes[0]->getArea() << endl;
    shapes[3]->draw();

    return 0;
}