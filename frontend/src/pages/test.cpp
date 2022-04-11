#include <iostream>

using namespace std;

void reverse(int reading[], int size) {
    // note that if size is 5 then the last index is 4
    // traverse the array from index 0 to size/2 and swap the element at current index i and the element at index size - i -1
    for (int i = 0; i < size / 2; i++) {
        // swapping
        // create a local variable to hold reading[i]
        int temp = reading[i];
        // assign reading[i] the value at reading[size - i-1]
        reading[i] = reading[size - i - 1];
        // assign reading[size - i-1] the value stored in temp
        reading[size - i - 1] = temp;

        // our values are swapped
    }
}

int main() {
    // declare an array of size 10
    int array[10];

    // getting input from user
    for (int i = 0; i < 10; i++) {
        cout << "Enter array element " << i + 1 << "\n";
        cin >> array[i];
    }

    // calling reverse
    reverse(array, 10);

    // printing the new array
    for (int i = 0; i < 10; i++) {
        cout << array[i] << " ";
    }

    return 0;
}