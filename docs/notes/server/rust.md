# **Rust 全面教程**

## 简介

### Ruby 是什么语言

- **Ruby** 是一种动态、面向对象的编程语言，由日本人 **松本行弘（Yukihiro Matsumoto）** 开发。
- 设计理念是 **简单、优雅、让程序员快乐**。
- 特点：
  - **纯面向对象**：几乎所有东西都是对象（包括数字、字符串等）。
  - **动态类型**：不需要声明变量类型。
  - **灵活性高**：允许修改核心类和方法。
  - **简洁易读**：语法自然，像英语一样容易理解。
- **应用场景**：
  - Web 开发（最著名的是 Ruby on Rails 框架）
  - 脚本和自动化任务
  - DevOps 工具（比如 Chef）
  - 构建工具和包管理（RubyGems）

### 之前安装的一大堆是什么

你在安装 Nokogiri 和 Ruby 时，实际上涉及了几个概念：

a) Ruby 本身

- 核心语言和解释器。
- 版本很重要：不同版本对 gem（Ruby 的包）支持不同。
- macOS 自带 Ruby，但通常版本较老（2.x），无法支持最新 gem。

b) RubyGems

- Ruby 的官方包管理工具。
- 类似于 Python 的 pip 或 Node 的 npm。
- 你用 `gem install xxx` 就是通过 RubyGems 安装 Ruby 的库或工具。

c) gem（Ruby 包）

- 就是 Ruby 的第三方库或工具。
- 例子：
  - `nokogiri`：解析 XML/HTML 的库（C 扩展，高性能）。
  - `racc`：Ruby 的解析器工具（Nokogiri 的依赖）。
- gem 可以包含纯 Ruby 代码，也可以包含 **C 扩展**（需要编译）。

d) 依赖库（libxslt、libxml2 等）

- 有些 gem（尤其是带 C 扩展的 gem，比如 Nokogiri）依赖系统的 C 库来加速处理。
- `libxslt`、`libxml2` 就是 XML/HTML 解析相关的底层库。
- Homebrew 安装这些库是为了给 gem 提供编译依赖。

你之前安装的可以理解为三类东西：

| 名称              | 类型        | 作用                       |
|-----------------|-----------|--------------------------|
| Ruby            | 语言本身      | 编写和执行 Ruby 代码            |
| RubyGems        | 包管理器      | 安装、管理 Ruby 包             |
| Nokogiri 等 gem  | Ruby 库/工具 | 提供具体功能，比如解析 XML/HTML     |
| libxslt/libxml2 | 系统 C 库    | gem 的底层依赖，加速 XML/HTML 处理 |

💡 简单比喻：

- **Ruby** = “语言本身”，你写的脚本或程序都用它。
- **gem** = “插件或库”，帮你做具体事情。
- **C 库** = gem 的底层引擎，让 gem 更快或更强大。
- **RubyGems** = “插件管理器”，帮你安装和管理 gem。

## **第 1 章：环境安装与工具**

### 1.1 安装 Rust

官方推荐使用 `rustup`：

```bash
# Linux / macOS
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Windows (PowerShell)
winget install RustLang.Rust
```

### 1.2 查看版本

```bash
rustc --version     # Rust 编译器
cargo --version     # Rust 包管理和构建工具
rustup --version    # Rustup 版本
```

### 1.3 更新 Rust

```bash
rustup update
```

### 1.4 常用工具

* **Cargo**：Rust 的包管理器和构建工具
* **rustfmt**：代码格式化

```bash
cargo fmt
```

* **clippy**：代码静态检查

```bash
cargo clippy
```

* **rustdoc**：生成文档

```bash
cargo doc --open
```

---

## **第 2 章：Rust 工程管理**

### 2.1 创建项目

```bash
# 创建可执行程序
cargo new my_project

# 创建库项目
cargo new my_lib --lib
```

### 2.2 构建与运行

```bash
cargo build             # 编译
cargo run               # 编译并运行
cargo check             # 语法检查
cargo build --release   # release 版本
```

### 2.3 添加依赖

修改 `Cargo.toml`：

```toml
[dependencies]
serde = "1.0"
```

然后执行：

```bash
cargo build
```

---

## **第 3 章：基础语法**

### 3.1 变量与常量

```rust
let x = 5;          // 不可变变量
let mut y = 10;     // 可变变量
const MAX: u32 = 100; // 常量
```

### 3.2 数据类型

* 标量类型：`i32`, `u32`, `f32`, `f64`, `bool`, `char`
* 复合类型：`tuple`, `array`

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (a, b, c) = tup;   // 解构
let arr: [i32; 3] = [1,2,3];
```

### 3.3 控制流

```rust
if number < 5 {
    println!("小于5");
} else {
    println!("大于等于5");
}

for i in 0..5 { println!("{}", i); }
let mut n = 0;
while n < 3 { n += 1; }
```

### 3.4 函数

```rust
fn add(a: i32, b: i32) -> i32 { a + b }

let sum = add(3, 4);
```

---

## **第 4 章：所有权与借用**

### 4.1 所有权（Ownership）

* 每个值都有一个变量所有者
* 值同一时间只能有一个所有者
* 所有者离开作用域时，值被释放

```rust
let s1 = String::from("hello");
let s2 = s1; // s1 移动到 s2, s1 不可再用
```

### 4.2 借用（Borrowing）

```rust
let s1 = String::from("hello");
let s2 = &s1;  // 借用，不移动所有权
println!("s1={}, s2={}", s1, s2);
```

### 4.3 可变借用

```rust
let mut s = String::from("hello");
let s_ref = &mut s; // 可变借用
s_ref.push_str(" world");
```

---

## **第 5 章：结构体与枚举**

### 5.1 Struct

```rust
struct User {
    username: String,
    active: bool,
}

let user1 = User { username: String::from("Alice"), active: true };
```

### 5.2 Enum

```rust
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

let dir = Direction::Up;
```

### 5.3 方法与关联函数

```rust
impl User {
    fn greet(&self) { println!("Hello, {}", self.username); }
}

user1.greet();
```

---

## **第 6 章：模块与包**

### 6.1 模块

```rust
mod mymod {
    pub fn hello() { println!("Hello from mymod!"); }
}

mymod::hello();
```

### 6.2 包（Crate）

* **二进制包（Binary Crate）**：可执行程序
* **库包（Library Crate）**：提供模块或功能给其他包使用

---

## **第 7 章：错误处理**

### 7.1 Result 与 Option

```rust
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 { Err(String::from("除数不能为0")) }
    else { Ok(a / b) }
}

match divide(10, 2) {
    Ok(v) => println!("结果: {}", v),
    Err(e) => println!("错误: {}", e),
}
```

### 7.2 panic!

```rust
panic!("程序异常结束");
```

---

## **第 8 章：泛型、Trait 与生命周期**

### 8.1 泛型

```rust
fn largest<T: PartialOrd>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list.iter() {
        if item > largest { largest = item; }
    }
    largest
}
```

### 8.2 Trait

```rust
trait Speak { fn speak(&self); }

struct Dog;
impl Speak for Dog { fn speak(&self) { println!("Woof!"); } }
```

### 8.3 生命周期

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

---

## **第 9 章：智能指针与集合**

* `Box<T>`：堆分配
* `Rc<T>`：引用计数
* `RefCell<T>`：运行时可变性
* 常用集合：

```rust
let v = vec![1,2,3];
let mut map = std::collections::HashMap::new();
map.insert("key", "value");
```

---

## **第 10 章：并发与异步**

### 10.1 线程

```rust
use std::thread;
let handle = thread::spawn(|| {
    println!("子线程运行");
});
handle.join().unwrap();
```

### 10.2 异步

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    sleep(Duration::from_secs(1)).await;
    println!("异步任务完成");
}
```

---

## **第 11 章：常用工具链与调试**

* **cargo fmt**：格式化代码
* **cargo clippy**：静态检查
* **cargo test**：单元测试

```rust
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_add() { assert_eq!(2+2, 4); }
}
```

* **cargo doc**：生成文档

---

如果你愿意，我可以帮你做一张 **Rust 学习路线图图示**，把每一章的内容用图表形式展示，更直观，便于学习和复习。

你希望我帮你画吗？
