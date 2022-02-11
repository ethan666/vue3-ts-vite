/*
 * @Descripttion: 文件描述
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2022-02-11 14:09:20
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-02-11 14:09:21
 */
class Student {
  fullName: string;
  constructor(public firstName, public middleInitial, public lastName) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

const user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
