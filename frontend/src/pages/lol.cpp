#include <fstream>
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Customer {
   public:
    string Id;
    string title;
    string fN;
    string lN;
    string cName;
    string sPerson;
    double sales = 0;
    string preSPerson = "";
    double commissions = 0;

    Customer(string id, string title, string fN, string lN, string cName, string sPerson, double sales = 0, string preSPerson = 0, double commissions = 0) {
        this->Id = id;
        this->title = title;
        this->fN = fN;
        this->lN = lN;
        this->cName = cName;
        this->sPerson = sPerson;
        this->sales = sales;
        this->preSPerson = preSPerson;
        this->commissions = commissions;
    }

    void printDetails() {
        cout << "Customer Details: " << Id << " " << title << " " << fN << " " << lN << " " << cName << endl;
    }
};

int main() {
    fstream fio;
    fio.open("input.txt");
    string line;

    vector<Customer> customers;
    while (!fio.eof()) {
        getline(fio, line);

        // Press -1 to exit
        if (line == "-1")
            break;

        // getting data from line , separated by comma
        string Id;
        string title;
        string fN;
        string lN;
        string cName;
        string sPerson;
        double sales = 0;
        string preSPerson = "";
        double commissions = 0;

        string word = "";
        int wordCount = 0;
        for (int i = 0; i < line.length(); i++) {
            if (line[i] == ',') {
                switch (wordCount) {
                    case 0: {
                        Id = word;
                        break;
                    }
                    case 1: {
                        title = word;
                        break;
                    }
                    case 2: {
                        fN = word;
                        break;
                    }
                    case 3: {
                        lN = word;
                        break;
                    }
                    case 4: {
                        cName = word;
                        break;
                    }
                    case 5: {
                        sPerson = word;
                        break;
                    }
                    case 6: {
                        sales = stod(word);  // stod converts string to double
                        break;
                    }
                    case 7: {
                        preSPerson = word;
                        break;
                    }
                    case 8: {
                        commissions = stod(word);
                        break;
                    }
                    default: {
                        break;
                    }
                }
                wordCount++;
                word = "";
            } else {
                word += line[i];
            }
        }

        Customer c(Id, title, fN, lN, cName, sPerson, sales, preSPerson, commissions);
        customers.push_back(c);
    }

    double total7th = 0, total9th = 0;
    for (int i = 0; i < customers.size(); i++) {
        customers[i].printDetails();
        total7th += customers[i].sales;
        total9th += customers[i].commissions;
    }

    cout << "Total 7th: " << total7th << endl;
    cout << "Total 9th: " << total9th << endl;

    // Close the file
    fio.close();
    return 0;
}