const hello = (name: string) => {
  console.log(`Hello ${name}`)
}

hello('tom')

export { } // 确保跟其他文件没有成员冲突


interface Eat {
  eat(food: string): void
}
interface Run {
  run(distance: number): void
}
class Person implements Eat,Run{
  eat(food: string): void {
    console.log(`${food}`)
  }
  run(distance: number): void {
    console.log(`${distance}`)
  }
}

class Animal implements Eat,Run{
  eat(food: string): void {
    console.log(`${food}`)
  }
  run(distance: number): void {
    console.log(`${distance}`)
  }
}