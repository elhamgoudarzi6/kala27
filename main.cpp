#include <conio.h>>
#include <iostream>
 using namespace std;
class circle{
	private:
	 int radius;
     public:
	void get_radius();
	void mohit();
	void masahat();
};
//**************
void  circle::get_radius()
  {
     cout<< "Enter radius:";
     cin>> radius;
  }
//******************
void circle::masahat()
{
   float s;
   s = radius * radius * 3.14;
   cout << "masahat = " << s;
}
void circle::mohit()
{
   float s;
   s = 2 * radius * 3.14;
   cout << "mohit = " << s;
}
//***************
int main()
{
    circle cVar;
    cVar.get_radius();
    cVar.masahat();
    cVar.mohit();
    return 0;
}
 
