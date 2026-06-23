---
title: Python基础
date: 2026-06-18 22:27:04
tags:
  - Python
  - 语法
categories:
  - Python
---
Python是由荷兰人吉多·范罗苏姆（Guido van Rossum）在 1989 年在圣诞节期间创建、1991 年发布的高级编程语言，以简洁易读著称。
越是接近人类的语言就越高级，python就是高级编程语言。相反，越接近机器语言的就越低级，例如汇编。

Python的特点主要有语法简洁、代码量较少、类库强大等特点。
在机器学习领域提供了sklearn，在深度学习领域提供了Pytorch、TensorFlow等方便的库供我们使用，这也是笔者学习Python的主要原因。

## 1. 基础知识

### 1.1. 输入输出

**输出函数 print()**

```python
print() # 括号中填需要输出的内容

print(*object, sep=' ', end='\n', file=None, flush=False) -> None # 函数签名
```

**输入函数 input()**

```python
input() # 括号中填需要输入的内容

input(prompt='',/) -> str # 函数签名
```

### 1.2. 缩进

这里要着重说一下python中的缩进，与大多数语言使用{}来表示代码归属不同，python使用缩进来表示代码归属，所以python的缩进一定要严格。python官方推荐使用4个空格作为一级缩进。

### 1.3. 注释

**单行注释**

井号
```python
# 这是一个单行注释
```

**多行注释**

多个井号
```python
#这是一个
#多行注释
```

三引号或三双引号
```python
"""
  这是一个
  多行注释
"""
'''
  这也是一个
  多行注释
'''
```

这里需要注意三引号的本质，三引号并不是真正的注释而是多行字符串。因为这里并没有赋值给变量，解释器创建后会将其丢弃，因此可以作为多行注释的一种偷懒写法。这也是为什么在代码块中这里显示的是代表字符串的颜色而不是代表注释的颜色。

## 2. 变量

### 2.1. 变量需要符合标识符的命名规则

**标识符的命名规则：**

(1) 字母、数字、下划线组成

(2) 不可以数字开头

(3) 大小写敏感

(4) 不能使用关键字和保留字


### 2.2 行业通用规范（PEP8规范）

**(1) 普通变量：蛇形命名（snake_case）**

全部小写，单词之间使用下划线分隔
```python
user_name = "Supzj"
```

  **(2) 常量：**

  全大写+下划线
```python
PI = 3.14159
```

**(3) 类名：大驼峰（PascalCase）**

  每个单词首字母大写
```python
class UserInfo:
    pass
```

**(4) 私有变量：**

  单下划线开头，字母小写
```python
_user_pwd = "123456"
```

## 3. 数据类型
### 3.1 数据类型的分类
**(1) 整型（int）：**

整数
```python
a = 5
```

**(2) 浮点型（float）：**

小数
```python
a = 0.5
```
科学计数法
```python
a = 1e8 # 1 * 10^8
```

**(3) 字符串（string）:**

中英文
```python
a = 'str'
b = "字符串"
c = """str"""
d = '''字符串'''
```
单引号和双引号换行需要打换行符：\n，三引号和三双引号内部可以直接换行，无需打换行符。除此之外单双引号本质上基本没有差别

**(4) 布尔值（bool）:**

真/假,0/1,True/False
```python
a = True
```

**(5) 空（None）:**

没有值/空值/什么都没有
```python
a = None
```

**(6) 列表、元组、字典、集合等**

都是python中常见的数据类型，后面有单独的讲解

### 3.2. 类型转换
python中类型转换的语法是： **b类型(a类型的变量)**\
这个式子的含义是把a类型的变量转换成b类型的变量
```python
a = int('12345') # 字符串转整型（字符串必须是数字）
b = int(20.1) # 浮点型转整型（直接抹掉小数的部分，这里b被赋值为20）
c = float('123.45') # 字符串转浮点型（字符串必须是数字）
```
以上的三种转换都是**可逆的**

### 3.3. 获取类型信息
**(1) type()**

用于获取对象的类型

语法：
```python
type(对象) # 返回的是对象的类型

type(object, /) -> bool # 函数签名
```
例子：
```python
a = 30
print(type(a))
```
输出：
```
<class 'int'>
```

**(2) isinstance()**

用来判断对象的数据类型

语法：
```python
isinstance(对象,数据类型) #返回的是一个布尔值

isinstance(object, classinfo, /) -> bool # 函数签名 
```
例子：
```python
a = 30

print(isinstance(a,float))
```
输出：
```
False
```

## 4. 运算符

运算符可以分为七大类

### 4.1. 算术运算符
```python
# +,-,*,/(除法),//(舍去小数的除法),%(模运算),**(幂运算)
```

### 4.2. 赋值运算符
```python
# =,+=,-=,*=,/=,//=,%=,**=
a += 1 #代表 a = a + 1，其他以此类推
```
这里的等于号并不是我们日常使用的等于号，而是赋值的意思

### 4.3. 比较运算符
```python
# >,<,>=,<=,==(这里的双等于是我们日常生活中使用的等于号),!=(不等于)
```

### 4.4. 逻辑运算符
```python
# and(与),or(或),not(非)
```

### 4.5. 二进制运算符

二进制运算符的使用是大多数新手的盲区，这里我详细介绍一下

**(1) 按位与&**

两个二进制位都是1，结果才是1
```python
a = 5 # 101
b = 3 # 011

print(a & b) # 001 转成十进制是1，所以这里会输出1
```

**(2) 按位或|**

只要有一个二进制位是1，结果才是1

例子：
```python
a = 5 # 101
b = 3 # 011

print(a | b) # 111 转成十进制是7
```
输出：
```
7
```

**(3) 按位异或^**

两个二进制位不同，结果是1；相同，结果是0

例子：
```python
a = 5 # 101
b = 3 # 011

print(a ^ b) # 110 转成十进制是6
```
输出：
```
6
```

**(4) 按位取反~**

把二进制位取反，1变0，0变1

例子：
```python
a = 5 

print(~a) # 这里比较特殊，先记住一个公式 ~x == -x - 1。因为计算机内所有的整数一律用补码存储，这里就不详细展开了
```
输出：
```
-6
```

**(5) 左移<<**

把二进制整体向左移动，右边补0

例子：
```python
a = 5 # 101

print(a << 1) # 1010 转成十进制是10。左移一位相当于乘2：5 << 1 == 5 * 2 == 10
```
输出：
```
10
```

**(6) 右移>>**

把二进制整体向右移动

例子：
```python
a = 5 # 101

print(a >> 1) #10 转成十进制是2。右移一位相当于整除2：5 >> 1 == 5 // 2 == 2
```
输出：
```
2
```

### 4.6. 成员运算符
```python
# in/not in(判断元素是否在序列中，用于列表、字符串、元组、字典、集合)
```

### 4.7. 身份运算符
```python
# is/is not(判断两个变量是否属于同一个对象)
```

## 5. 流程控制

### 5.1. 条件判断

**(1) 单条件**
```python
if 表达式: # 如果表达式为真则执行代码块1，为假则执行代码块2
    代码块1
else:
    代码块2
```

**(2) 多条件**
```python
if 表达式1: # 如果表达式1为假,则判断表达式2以此类推
    代码块1
elif 表达式2:
    代码块2
elif 表达式3:
    代码块3
  ...
else:
    代码块n
```

### 5.2. 循环流程

**(1) while循环**
```python
while 表达式: # 只要表达式为真则一直循环执行代码块
    代码块
```

**(2) for循环**
```python
for 变量 in 可迭代对象: #将可迭代对象赋值给变量后进入一次循环,有多少次迭代就进行多少次循环
    代码块
```

**(3) range**

for经常会搭配range使用，range是一个可迭代对象
```python
range(start=0,stop,step=1)
```
start是下标，下标默认从0开始，stop是结束位置，step是步长默认为1

这里需要注意range()是"左开右闭"的，也就是说不包括stop

```python
for i in range(8): #可以不写start和step但是stop一定要写
    print(i)
for i in range(0,1,8):
    print(i)
```

**(4) continue**

跳出本次循环，后面循环继续执行

**(5) break**

终止循环

## 6. 函数

函数就是一段可以被重复使用的代码。函数的核心作用：输入数据 -> 函数处理 -> 输出结果

### 6.1. 函数的基本语法

Python使用**def**定义函数

语法：
```python
def 函数名(参数):
    函数体
    return 返回值
```
函数定义之后，里面的代码不会立刻执行。只有调用函数时，函数体才会执行。

函数名本质上是一个变量名，它指向一个函数对象。函数名的命名规则和变量名一样。

例子：
```python
def add(a,b): # 函数定义
    return a + b

a1 = 10
a2 = 20

print(add(a1,a2)) # 函数调用
```
输出：
```
30
```

### 6.2. 参数

参数是函数接收外部数据的入口，在Python里，函数传参时有两个非常重要的概念：

形参：函数定义时写在括号里的变量。上方例子中的a、b是形参

实参：函数调用时真正传进去的值。上方例子中的a1、b1是实参

#### 6.2.1. 位置参数

最普通的参数叫位置参数，位置参数靠顺序匹配。

例子：
```python
def introduce(name, age):
    print(f"我叫{name}，今年{age}岁")

introduce("张三", 18)
```
输出：
```
我叫张三，今年18岁
```
如果改变位置参数的顺序：
```python
introduce("张三", 18)
```
则会输出：
```
我叫18，今年张三岁
```

**使用\*args来接收多个位置参数**

例子：
```python
def func(*args):
    print(args)

func(1, 2, 3)
```
输出：
```
(1, 2, 3)
```
这里的args本质上是一个元组

\*args：接收不确定数量的位置参数\
这里真正启作用的是“\*”，这里的“\*”代表会把多出来的位置参数收集成一个元组。“args”只是约定俗成的变量名，是可以更改的，但通常就叫“args”。

#### 6.2.2. 关键字参数

调用参数时，也可以指定参数名，这样就不依赖顺序了

例子：
```python
def introduce(name, age):
    print(f"我叫{name}，今年{age}岁")

introduce(age=18,name="张三")
```
输出：
```
我叫张三，今年18岁
```

关键字参数的优点是可读性强

**使用\*\*kwargs来接收多个关键字参数**

例子：
```python
def func(**kwargs):
    print(kwargs)

func(name="张三", age=18)
```
输出：
```
{'name': '张三', 'age': 18}
```

这里的kwargs本质上是一个字典

\*\*kwargs：接收不确定数量的关键字参数\
这里真正启作用的是“\*\*”，这里的“\*\*”代表会把多出来的关键字参数收集成一个字典。“kwargs”只是约定俗成的变量名，是可以更改的，但通常就叫“kwargs”。

#### 6.2.3. 默认参数

函数参数可以设置默认值，默认参数必须写在普通参数后面

例子：
```python
def greet(name, message="你好"):
    print(f"{message}，{name}")

greet("小明")
greet("小明", "早上好")
```
输出：
```
你好，小明
早上好，小明
```
如果调用时没有传message，就使用默认值"你好"

#### 6.2.4. 参数顺序

Python函数参数有固定顺序
一般情况下格式是：
```python
def func(普通参数, 默认参数, *args, 关键字专用参数, **kwargs):
    pass
```

**只允许关键字传参**

在函数参数中，单独的“\*”**后面**的参数必须用关键字传入。
```python
def create_user(name, *, age, city):
    print(name, age, city)

create_user("张三", age=18, city="上海") # 正确
create_user("张三", 18, "上海") # 会报错
```
这样写的好处是可读性更强。

**只允许位置传参**

在函数参数中，单独的“/”**前面**的参数只能用位置传参。
```python
def func(a, b, /, c):
    print(a, b, c)

func(1, 2, 3) # 正确
func(a=1, b=2, 3) # 会报错
```

### 6.3. 返回值

return的作用是返回结果并结束函数

函数中如果没有return则默认返回None

Python函数可以返回多个值
```python
def get_info():
    name = "张三"
    age = 18
    return name, age

result = get_info()
print(result)
```
输出：
```
('张三', 18)
```

### 6.4. 作用域

函数内部定义的变量，一般只能在函数内部使用。
```python
def func():
    x = 10
    print(x)

func()
print(x) # 这一行会报错
```
在上面例子中，最后一行会报错，因为x是**局部变量**。如果你在内函数内部给变量赋值，Python会默认它是局部变量

在函数外面的变量叫全局变量，在函数内部可以使用，但是无法修改。
```python
x = 10

def func():
    print(x)

func()
```
输出：
```
10
```

**global关键字**

如果确实想在函数内部修改全局变量，可以使用global关键字
```python
x = 10

def func():
    global x
    x = 20

func()
print(x)
```
输出：
```
20
```
一般不推荐频繁使用global，他会让函数依赖外部环境，代码更难维护。

### 6.5. 文档字符串docstring

函数内部第一行字符串可以作为函数说明。
```python
def add(a, b):
    """
    返回两个数的和。
    """
    return a + b
```
文档字符串可以通过help()和__doc__查看

```python
def add(a, b):
    """
    返回两个数的和。
    """
    return a + b

help(add) # 通过help()查看
print(add.__doc__) # 也可以通过__doc__查看
```

### 6.6. lambda函数

lambda函数用来定义简单的匿名函数。
普通函数：
```python
def square(x):
    return x * x
```
lambda函数：
```python
square = lambda x: x * x
```

lambda函数常用于简单场景，比如排序：
```python
students = [
    {"name": "张三", "score": 90},
    {"name": "李四", "score": 80},
    {"name": "王五", "score": 95},
]

students.sort(key=lambda student: student["score"])

print(students)
```

### 6.7. 函数签名

Python的函数签名是函数对外暴露的接口调用规范，包含：函数名 + 参数列表 + 返回值类型。规定了怎么调用这个函数，编译器也通过签名做类型检查、提示、重载判断等
例子：
```python
def add(a, b):
    return a + b
```
它的函数签名可以写成：
``` python
add(a, b)
```
比较简单的函数签名就是；
```python
函数名(参数列表)
```

也可以加上参数类型标注和返回值类型：
```python
def add(a: int, b: int = 0) -> int:
    return a + b
```
函数签名：
```python
add(a: int, b: int = 0) -> int
```
格式：
```python
函数名(参数名: 参数类型 = 默认值) -> 返回值类型
```

这里可以与前面讲过的位置参数、关键字参数、默认参数等等结合。
例子：
```python
def example(a, b, /, c, d=10, *args, e, f=20, **kwargs):
    pass
```
签名：
```python
example(a, b, /, c, d=10, *args, e, f=20, **kwargs) -> None
# a, b	只能位置传参
# /	左边是仅位置参数
# c	普通参数
# d=10	有默认值的普通参数
# *args	接收多余的位置参数
# e	仅关键字参数，必须传
# f=20	有默认值的仅关键字参数
# **kwargs	接收多余的关键字参数
```

## 7. 字符串

在用python进行数据清洗的时候，字符串能否准确使用尤为关键。所以这里单开一节，来介绍字符串的应用。

### 7.1. 转义字符

在python中有一些字符不能直接写，或者有特殊含义，需要使用反斜杠\

**(1) 换行\n**

例子：
```python
print("Hello\nWorld")
```
输出：
```
Hello
World
```

**(2) 制表符\t**

相当于Tab，在字符串中插入一段空白，用来对齐文本，默认占8个空格宽度

例子：
```python
print("姓名\t年龄\t城市")
print("小明\t18\t北京")
```
输出：
```
姓名	年龄	城市
小明	18	北京
```

**(3) 反斜杠\\\\**

因为打别的转义字符需要用到反斜杠，所以想单独打一个反斜杠可以通过\\

例子：
```python
print("C:\\Users\\supzj\\Desktop")
```
输出：
```
C:\Users\supzj\Desktop
```

**(4) 单引号\\'**

如果字符串外层用单引号包裹，但内部还需要输出一个单引号时可以使用

例子：
```python
print('\'str\'')
```
输出：
```
'str'
```
这里其实有一个更加方便的办法：当字符串内部需要输出单引号时，外层就用双引号包裹，反之依然。

**(5) 双引号\\"**

例子：
```python
print("\"str\"")
```
输出：
```
"str"
```

### 7.2. 字符串的索引

字符串可以看成是由一个个字符串组成的序列，每个字符都有位置编号，叫做索引。

```python
s = "Python"
```
```
 P  y  t  h  o  n
 0  1  2  3  4  5
-6 -5 -4 -3 -2 -1
```

```python
s = "Python"

print(s[0]) # P
print(s[1]) # y
print(s[5]) # n

print(s[-1]) # n
print(s[-2]) # o
print(s[-6]) # P

```

这里要注意字符串是不可变类型，也就是说字符串创建之后，不能直接修改其中某一个字节。
```python
s = "Python"
s[0] = "J"
```
这样会报错

### 7.3. 字符串的切片

切片就是从字符串中取出一部分

语法：
```python
字符串[起始位置:结束位置:步长] #包含起始位置，不包含结束位置
```
起始位置默认为0，结束位置默认末尾，步长(隔几个取一个)默认为1(每一个都取)

例子：
```python
s = "Python"

# 大多数情况省略步长
print(s[0:2]) # Py
print(s[1:4]) # yth

#可以省略起点或终点
print(s[:2]) #Py
print(s[2:]) #thon

print(s[::2]) # Pto
print(s[1::2]) # yhn

# 字符串反转
print(s[::-1]) # nohtyP
```

### 7.4. 字符串拼接

**(1) 用+**
例子：
```python
a = "Hello"
b = "World"

print(a + " " + b)
```
输出：
```
Hello World
```

**(2) 用***
例子：
```python
s = "ha"
print(s * 3)
```
输出：
```
hahaha
```

**(3) join**
函数签名：
```python
str.join(iterable, /)
# ste：作为分隔符的字符串
# iterable：可迭代对象
```
用前面的分隔符把每一次迭代拼起来

例子：
```python
words = ["Python","is","good"]
sentence = " ".join(words)

print(sentence)
```
输出：
```
Python is good
```

### 7.5. 字符串格式化

现在最常用的是f-string

例子：
```python
name = "C++"
adj = "世界上最好"

print(f"{name}是{adj}的语言")
```
输出：
```
C++是世界上最好的语言
```
{}中也可以写表达式

例子：
```python
a = 10
b = 20

print(f"{a} + {b} = {a + b}")
```
输出：
```python
10 + 20 = 30
```

还可以控制小数位数：
```python
pi = 3.1415926

print(f"{pi:.2f}") # :.2f 表示保留两位小数
```
输出：
```
3.14
```
f-string是Python3.6+的首选字符串格式化方法，性能最快、可读性最高。之前还有几种字符串格式化，但都比较繁琐，这里就不过多赘述了。

### 7.6 字符串方法

字符串也有很多自带的方法

#### 7.6.1. 获取长度

**len()**
```python
s = "Python"
print(len(s)) #6
```

#### 7.6.2. 大小写转换

**upper()和lower()**

函数签名：
```python
str.upper(self, /) -> str
#self：代表前面的str自身,无需在调用时手动传入

str.lower(self, /) -> str
```
例子：
```python
s = "Python"

print(s.upper()) # PYTHON
print(s.lower()) # python
```

#### 7.6.3. 去掉两边的指定字符

**strip()**

函数签名：
```python
str.strip(self, chars=None, /) -> str
# char：需要去掉的字符，不填默认空格
```
例子：
```python
s = "   hello world   "

print(s.strip())
```
输出：
```python
hello world
```
注意它只去掉两边，不去掉中间

类似的还有：
```python
str.lstrip(self, chars=None, /) -> str # 只去掉左边的空白
str.rstrip(self, chars=None, /) -> str # 只去掉右边的空白
```

#### 7.6.4. 替换内容

**replace()**

函数签名：
```python
str.replace(self, old, new, /, count=-1) -> str
# old：被替换内容
# new：替换内容
# count：最多替换前多少次（不写则默认全部替换）
```
例子：
```python
s = "I like Jave"
new_s = s.replace("Jave","Python") # 大小写敏感

print(new_s)
```
输出：
```
I like Python
```
注意，原字符串不会被修改，字符串不可变

#### 7.6.5. 切分字符串

**split()**

把字符串切成列表

函数签名：
```python
str.split(self, /, sep=None, maxsplit=-1) -> list[str]
# sep：按什么字符切分，默认是空格
```
例子：
```python
s = "Python is good"
print(s.split())
```
输出：
```
['Python', 'is', 'good']
```

#### 7.6.6. 查找字符串

**find()**

函数签名：
```python
str.find(self, sub, start=0, end=len(self), /) -> int
# sub：需要查找的字符串
# start：起始位置的引索，默认是0，也就是从头开始
# end：结束位置的引索，默认是len(self)，也就是字符串的结尾
# -> int：返回查找到的字符串一个字符的引索
```
例子：
```python
s = "hello python"

print(s.find("python"))  # 6
print(s.find("java"))    # -1
```

**index()**
函数签名：
```python
str.index(self, sub, start=0, end=len(self), /) -> int
```
作用与find()类似，但如果找不到时会**报错**而find()不会。

#### 7.6.7. 判断开头和结尾

**startswith()**

函数签名：
```python
str.startswith(self, prefix, start=0, end=len(self), /) -> bool
# prefix：需要查找的字符串，也可以是字符串元组，表示多个前缀满足一个即可。
# start：限定查找起始位置，默认从头开始
# end：限定查找结束位置，默认字符串结尾
# -> bool：prefix与开头是否匹配
```
例子：
```python
filename = "test.py"

print(filename.startswith("test"))  # True
print(filename.startswith("main"))  # False
```

**endswith()**

函数签名：
```python
str.endswith(self, suffix, start=0, end=len(self), /) -> bool
# suffix：需要查找的字符串，也可以是字符串元组，表示多个后缀满足一个即可。
# start：限定查找起始位置，默认从头开始
# end：限定查找结束位置，默认字符串结尾
# -> bool：suffix与结尾是否匹配
```
例子：
```python
filename = "test.py"

print(filename.endswith(".py"))  # True
print(filename.endswith(".txt"))  # False
```

#### 7.6.8. 判断字符串内容

**isdigit()**

用于判断字符串是否全部由数字字符组成

函数签名：
```python
str.isdigit(self, /) -> bool
```
例子：
```python
print("123".isdigit())   # True
print("123a".isdigit())  # False
print("3.14".isdigit())  # False
```

### 7.7. 字符串前缀

Python 字符串前面可以加一些前缀。

**r：原始字符串**

比如不会\n当成换行

```python
s = r"C:\Users\test\new"
print(s)
```

**f：格式化字符串**

这个前面有详细说过，这里就不展开了

**b：字节字符串**
```python
b = b"hello"
print(type(b))  # <class 'bytes'>
```

**fr：组合使用**

既可以格式化、又可以使用原始字符串

```python
name = "test"
path = fr"C:\Users\{name}\Desktop"

print(path)
```
