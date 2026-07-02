---
title: Python进阶
date: 2026-06-30 17:37:33
tags:
  - Python
  - 语法
categories:
  - Python
---

前面的Python基础文章中简单介绍了Python的基础语法和一些常见的操作

这篇文章则会更加深入Python的各项机制

## 1. 对象与内存

Python中几乎一切都是对象

比如：
```python
x = 10
s = "hello"
lst = [1, 2, 3]
d = {"name", "Tom"}
```
这里的10、"hello"、[1, 2, 3]、字典对象本身，都是对象

这里的
```python
x = 10
```
相当于创建一个整数对象10,然后让名字x指向这个对象

所以在python中，变量更像是标签

更具体的例子：
```python
x = 10
y = x
```
这里并不是复制一个新的10,而是让y也指向同一个对象10
```
x  ───┐
      ├──> 整数对象 10
y  ───┘
```

### 1.1 可变对象和不可变对象

#### 1.1.1. 不可变对象

对象创建后，内容不能被原地修改

常见类型有：int、float、bool、str、tuple、forzenset

不可变对象最重要的特点是不能被原地修改：
```python
a = 10

a = a + 1
```
很多人会以为**a = a + 1**是把原来的10改成11，时则不热

因为int是不可变对象，所以10这个对象本身不会变成11

实际过程：
```
a -> 10

a = a + 1

a -> 11
```
a只是从指向10，变成了指向新的对象11。

所以这里并不是原来的10被修改了，而是生成了一个新的int：11，然后让a指向新对象。

所以：
```python
a = 10
print(id(a))

a = a + 1
print(id(a))
```
输出的两次id不一样

#### 1.1.2. 可变对象

对象创建后，内容可以被原地修改

常见类型：list、dict、set、大多数自定义对象

与不可变对象相反，可变对象是可以被原地修改的

例子：
```python
lst = [1, 2, 3]
print(id(lst))

lst.append(4)
print(id(lst))
```
这里输出的两个id是一样的

所以修改可变对象会修改原来的对象，而不是创建一个全新的对象。

#### 1.1.3. 重新赋值与原地修改的区别

重新赋值：
```python
a = [1, 2, 3]
b = a

a = [4, 5, 6]

print(b)
```
输出：
```
[1, 2, 3]
```

关系变化：
```
一开始：
a ───┐
     ├──> [1, 2, 3]
b ───┘

执行 a = [4, 5, 6] 后：

a -> [4, 5, 6]

b -> [1, 2, 3]
```

原地修改：
```python
a = [1, 2, 3]
b = a

a.append(4)

print(b)
```
输出：
```
[1, 2, 3, 4]
```

关系：
```
a ───┐
     ├──> [1, 2, 3, 4]
b ───┘
```

### 1.2 浅拷贝和深拷贝

拷贝问题主要出现在**容器对象**上

#### 1.2.1. 浅拷贝

浅拷贝会创建一个新的外层容器，但里面的元素仍然与原来共享

例子：
```python
a = [1, 2, 3]
b = a.copy()

b.append(4)

print(a)
print(b)
```
输出：
```
[1, 2, 3]
[1, 2, 3, 4]
```
说明a和b已经不是同一个列表了

但是注意，浅拷贝只拷贝最外层

例子：
```python
a = [[1, 2], [3, 4]]
b = a.copy()

b[0].append(99)

print(a)
print(b)
```
输出：
```
[[1, 2, 99], [3, 4]]
[[1, 2, 99], [3, 4]]
```

因为浅拷贝之后外面的列表是新的，但是里面的子列表还是同一批对象

#### 1.2.2. 深拷贝

深拷贝会递归地拷贝对象内部的对象

使用copy.deepcopy()：
```python
import copy

a = [[1, 2], [3, 4]]
b = copy.deepcopy(a)

b[0].append(99)

print(a)
print(b)
```
结果：
```
[[1, 2], [3, 4]]
[[1, 2, 99], [3, 4]]
```

### 1.3. is

#### 1.3.1. is 和 ==

**== 比较值**

```python
a = [1, 2, 3]
b = [1, 2, 3]

print(a == b)
```
输出：
```
True
```

**is 比较身份**

```python
a = [1, 2, 3]
b = [1, 2, 3]

print(a is b)
```
输出：
```
False
```

#### 1.3.2. 小整数和字符串驻留问题

```python
a = 10
b = 10

print(a is b)
```
结果可能是：
```
True
```

但是在Python中，一些小整数，短字符串可能会被缓存或复用。

所以
```python
a = 10
b = 10

print(a is b)
```
在不同环境下结果可能是不一样的，所以判断数值是否相等就用==

#### 1.3.3. is常见使用场景

最常见的场景：判断是否为None
```python
if x is None:
    ...
```
因为None是单例对象，整个python程序里通常只有一个None对象。

### 1.4. 函数传参机制

python的函数传参既不是传统意义上的值传递，也不是传统意义上的引用传递，而是对象引用的传递

这个引用本身是按赋值方式绑定给形参的。

#### 1.4.1. 不可变对象传参

```python
def change(x):
    x = 20

a = 10
change(a)

print(a)
```
输出：
```
10
```

调用过程可以这样理解：
进入函数时：
```
a ───┐
     ├──> 10
x ───┘
```
函数内部执行：
```python
x = 20 
```
结果：
```
a -> 10

x -> 20
```

#### 1.4.2. 可变对象传参

```python
def change(lst):
    lst.append(4)

a = [1, 2, 3]
change(a)

print(a)
```
输出：
```
[1, 2, 3, 4]
```

调用过程：
进入函数时：
```
a   ───┐
       ├──> [1, 2, 3]
lst ───┘
```
函数内部执行：
```python
lst.append(4)
```
这是对列表函数进行原地修改

所以函数外面也能看到变化

#### 1.4.3. 形参重新赋值，不影响实参

```python
def change(lst):
    lst = [4, 5, 6]

a = [1, 2, 3]

print(a)
```
输出：
```
[1, 2, 3]
```

这次没有变，因为：
```python
lst = [4, 5, 6]
```
是让形参lst指向一个新列表，而不是修改原来的列表，所以外面的a没有变化

#### 1.4.4. +=的特殊情况

+=对可变对象和不可变对象的表现不一样

对不可变对象：
```python
def change(x):
    x += 1

a = 10
change(a)

print(a)
```
输出：
```
10
```
因为整数不可变，x += 1 等价于创建新整数，然后让 x 指向它。

对可变对象：
```python
def change(lst):
    lst += [4]

a = [1, 2, 3]
change(a)

print(a)
```
输出：
```
[1, 2, 3, 4]
```
对列表来说：
```python
lst += [4]
```
通常是原地扩展列表，所以会影响外部列表

### 1.5. 函数默认参数

```python
def add_item(item, lst=[]):
    lst.append(item)
    return lst

print(add_item(1))
print(add_item(2))
print(add_item(3))
```
会输出：
```
[1]
[1, 2]
[1, 2, 3]
```

会有人认为每次调用函数时都会创建一个新的空列表

但是实际上，默认参数只会在函数定义时创建一次

正确写法：
```python
def add_item(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
  return lst
```
这样每次没有传入 lst 时，都会在函数内部新建一个列表。

## 2. 面向对象编程

面向对象编程，英文叫Object-Oriented Programming，简称 OOP。

核心思想是：把现实世界中的事物抽象成程序中的对象，对象内部保存数据，并提供操作这些数据的方法。

Python是一门支持面向对象编程的语言。在Python中，Python中几乎一切都是对象

每个对象通常都有三个核心特征：
```python
id(x) # 对象的身份
type(x) # 对象的类型
x # 对象的值
```

### 2.1. 类和对象

类：对象的模板

对象：根据类创建出来的具体实例

例子：
```python
class Student:
    pass
```
这里的student就是一个类

创建对象：
```python
stu1 = Student()
stu2 = Student()
```

#### 2.1.1. 属性

对象中的数据叫做属性

例如：
```python
class Student:
    pass

stu = Student()

stu.name = "Tom"
stu.age = 18

print(stu.name)
print(stu.age)
```
输出：
```
Tom
18
```

这里的name和age就是对象stu的属性

#### 2.1.2. \_\_init\_\_()初始化方法

\_\_init\_\_()是Python类中的一个特殊方法

它会在创建对象时自动调用

```python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

stu = Student("Tom", 18)

print(stu.name)
print(stu.age)
```
输出：
```
Tom
18
```
执行这句代码时：
```python
stu = Student("Tom", 18)
```
python大致会做两件事：

1. 创建一个Student对象

2. 自动调用\_\_init\_\_()，给对象初始化属性

#### 2.1.3. self

self表示当前正在操作的那个对象本身，这里与c++中的this指针类似

```python
class Student:
    def __init__(self, name):
        self.name = name
```
把传进来的 name 保存到当前对象自己的 name 属性中

self一定要作为__init__()的第一个参数，python会自动把新建的实例对象作为第一个实参传给\_\_init\_\_，这个接收实例的形参，约定俗成的名字为self（其实把self换成别的名字也行，只是可读性会大大下降）

### 2.2. 方法和属性

#### 2.2.1. 实例属性和类属性

实例属性：属于某个具体对象

```python
class Student:
    def __init__(self, name):
        self.name = name
```
这里的self.name是实例属性，每个对象都有自己的一份

类属性：属于整个类，所有对象共享

```python
class Student:
    school = "XJTLU"

    def __init__(self, name):
        self.name = name

stu1 = Student("Tom")
stu2 = Student("Jack")

print(stu1.school)
print(stu2.school)
print(Student.school)
```
输出：
```
XJTLU
XJTLU
XJTLU
```
school是类属性，所有对象共享

#### 2.2.2. 实例方法

定义在类中，并且第一个参数是self的方法，叫做**实例方法**

```python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"大家好，我叫{self.name}，今年{self.age}岁。")

stu = Student("Tom",18)
stu.introduce()
```
输出：
```
大家好，我叫 Tom，今年 18 岁。
```
调用时：
```python
stu.introduce()
```
看起来没有传参数，但实际上Python会自动把stu传给self。

所以方法定义时必须要写：
```python
def introduce(self):
    pass
```

#### 2.2.3. 类方法

类方法使用@classmethod修饰，第一个参数通常叫cls

```python
class Student:
    count = 0

    def __init__(self, name):
        self.name = name
        Student.count += 1

    @classmethod
    def get_count(cls):
        return cls.count

stu1 = Student("Tom")
stu2 = Student("Jack")

print(Student.get_count())
```
输出：
```
2
```

cls表示当前类本身

类方法常用于操作类属性，或者创建对象的其他构造方法

```python
class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, date_str):
        year, month, day = map(int, date_str.split("-"))
        return cls(year, month, day)

d = Date.from_string("2026-06-30")
print(d.year, d.month, d.day)
```
输出：
```
2026 06 30
```

#### 2.2.4. 静态方法

静态方法使用@staticmethod修饰
```python
class MathTool:
    @staticmethod
    def add(a, b):
        return a + b

print(MathTool.add(3, 5))
```
输出：
```
8
```

静态方法适合放一些和这个类相关，但不依赖对象状态的函数

#### 2.2.5. 私有属性

Python没有c++那种严格的private，但是可以通过命名约定（这里并不是真正的禁止外部访问，而是一种约定）

**单下划线开头：\_name**
```python
class Student:
    def __init__(self, name):
        self._name = name
```
单下划线表示：这是内部属性，不建议外部直接访问

但它实际上仍然可以被访问

**双下划线开头：\_\_name**
```python
class Student:
    def __init__(self, name):
        self.__name = name
```
双下划线会触发名字改写，外部不能直接访问：
```python
stu.__name # 会报错
```
这里的名字改写是Python会把\_\_name改成\_Student\_\_name

所以实际上：
```python
stu._Student__name
```
是可以访问的

#### 2.2.6. @property

@property是python类中的一个装饰器，作用是：把一个方法伪装成属性来访问

最简单的例子：
```python
class Student:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

s = Student("Tom")

print(s.name)
```
输出：
```
Tom
```

这里是s.name而不是s.name()，因为name已经被@property包装成了一个属性

```python
@property
def age(self):
    return self._age
```
大致等价于：
```python
def age(self):
    return self._age

age = property(age)
```

完整写法一般有三个部分：@property、@xxx.setter、@xxx.deleter

```python
class Student:
    def __init__(self, age):
        self.age = age

    @property
    def age(self):
        print("读取age")
        return self._age

    @age.setter
    def age(self, value):
        print("设置 age")
        if value < 0:
            raise ValueError("年龄不能是负数")
        self._age = value

    @age.deleter
    def age(self):
        print("删除 age")
        del self._age
```

@property这个的函数名就是外部访问的属性接口

```python
@property
def age(self):
    ...
```
定义了一个叫做age的属性接口
```python
self.age = age
```
这里的self.age会调用age的setter
```python
s.age # 这里是外部访问
```
这里的s.age会调用age的getter，也就是@property下面的部分
```python
del s.age # 这里是删除
```
这里的del s.age会调用age的deleter

age是对外暴露的属性名，_age是真正保存数据的变量名

注意，\_\_init\_\_ 接收到的 age，会作为 @age.setter 方法的第二个形参传进去。

上面代码的对应关系相当于：
```
Student(18)
        ↓
__init__(self, age)
             ↓
           age = 18
             ↓
self.age = age
             ↓
调用 @age.setter
             ↓
def age(self, value):
              ↓
            value = 18
```

如果不写setter则无法在外部更改

如果不写deleter，就代表这个property不支持用del删除

### 2.3. 继承

继承表示：一个类可以复用另一个类的属性和方法

被继承的类叫父类，也叫基类

继承别人的类叫子类，也叫派生类

例子：
```python
class Animal:
    def eat(self):
        print("动物在吃东西")

class Dog(Animal):
    def bark(self):
        print("狗在叫")

dog = Dog()
dog.eat()
dog.bark()
```
输出：
```
动物在吃东西
狗在叫
```

在类名后面的**()**中写父类的名字，就可以继承父类

子类可以复用父类的属性和方法

**子类可以重写父类的方法**

```python
class Animal:
    def speak(self):
        print("动物在叫")

class Dog(Animal):
    def speak(self):
        print("狗在叫")

class Cat(Animal):
    def speak(self):
        print("猫在叫")

dog = Dog()
cat = Cat()

dog.speak()
cat.speak()
```
输出：
```
狗在叫
猫在叫
```

这就叫**方法重写**

#### 2.3.1. super()

如果子类重写了父类的方法，但又想复用父类的逻辑，可以用super()

或许有的人会认为：既然想复用父类的逻辑那就不应该重写

这里super()实际的应用场景是**在父类原有的逻辑基础上，再加一点自己的逻辑**

\_\_init\_\_是最常见的例子：
```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, age):
        super().__init__(name)
        self.age = age

dog = Dog("旺财", 3)

print(dog.name)
print(dog.age)
```
输出：
```
旺财
3
```

这里：
```python
super().__init__(name)
```
表示调用父类的\_\_init\_\_()，如果不super()则：
```python
self.name = name
```
这一句就不会自动执行

### 2.4. 多态

不同的对象调用同一个方法，可以表现出不同的行为

例如：
```python
class Dog:
    def speak(self):
        print("汪汪汪")


class Cat:
    def speak(self):
        print("喵喵喵")


def make_sound(animal):
    animal.speak()


dog = Dog()
cat = Cat()

make_sound(dog)
make_sound(cat)
```
输出：
```
汪汪汪
喵喵喵
```
这里 make_sound() 不关心传进来的到底是 Dog 还是 Cat。

它只关心这个对象有没有 speak() 方法。

这就是python典型的动态多态思想：鸭子类型（Duck Typing）\
看起来像鸭子、走起来像鸭子、叫起来像鸭子，那它就是鸭子

### 2.5. 特殊方法

Python中有很多双下划线开头和结尾的方法，例如：
```python
__init__
__str__
__len__
__eq__
```
等

它们叫做特殊方法，也有人叫魔术方法

这些方法可以让自定义对象支持Python内置语法

这里主要介绍几个常用的

#### 2.5.1. \_\_str\_\_

控制对象被print()时的显示效果
```python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"Student(name={self.name}, age={self.age})"

stu = Student("Tom", 18)

print(stu)
```
输出：
```
Student(name=Tom, age=18)
```

#### 2.5.2. \_\_len\_\_

让对象可以使用len()

```python
class Team:
    def __init__(self, members):
        self.members = members

    def __len__(self):
        return len(self.members)

team = Team(["Tom", "Jack", "Alice"])

print(len(team))
```
输出：
```
3
```

#### 2.5.3. \_\_eq\_\_

控制两个对象使用==比较时的行为

```python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __eq__(self, other):
        return self.name == other.name and self.age == other.age

stu1 = Student("Tom", 18)
stu2 = Student("Tom", 18)

print(stu1 == stu2)
```
输出：
```
True
```

