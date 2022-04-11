#include <stdio.h>

int main() {
    // array to store the names
    char name[2][50];
    // array to store the ages
    int age[2];
    // array to store the weights
    int weight[2];
    // error counter variable
    int errors = 0;
    // index variable
    int i = 0;
    while (i < 2) {
        errors = 0;
        // ask for name and store the name in array at ith position
        printf("Enter name: ");
        scanf("%s", name[i]);

        // ask for age and store the age in array at ith position
        printf("\nEnter age: ");
        scanf("%d", &age[i]);

        // check if age is greater than 0, if not then increment errors
        if (age[i] < 0) {
            errors++;
        }

        // ask user for weight and store in array at ith position
        printf("\nEnter weight: ");
        scanf("%d", &weight[i]);

        // check if weight is greater than 0, if not then increment errors
        if (weight[i] < 0) {
            errors++;
        }

        // check if number of  errors is more than 0 , if so, do not increment i , otherwise increment i
        if (errors > 0) {
            continue;
        } else
            i++;
    }

    return 0;
}