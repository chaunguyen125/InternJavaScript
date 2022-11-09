# THREAD AND PROCESS
A thread is a path of execution within a process. A process can contain multiple threads.
## Process
A process is a task which is being executed in a computer. A process can be handled by one or many thread. When we start a program, the Operator System make an process and run its main thread. Different processes do not share the same memory space.
## Thread
A thread is a part of execution handling a process, it's also known as a lightweight process. In programming, a process can be executed by Singlethreaded or Multithreaded processes.

Single-threaded is making only 1 task per time in a progress. So, its advantages can be mentioned as easy to program, to manage errors during execution, and requiring less resources of our computer. But, it has some limitations such as being used only for small project, low-complexity applications because it cannot handle many threads at the same time.

Multithreaded is executing many tasks at the same time. It helps reduce the execution time of a process because a thread does not need to wait for the previous thread completed to run. As mentioned, one process uses a separate memory space. Threads on a process share the same memory space to share resources. It helps to prevent the application from crashing, one sever can serve many clients at the same time; it also assists in making good use of the system's resources to build large applications. This easily leads to collisions between threads, the thread jumps to other threads leads to the competition for resources, the deadlock, the livelock and some bad results. In order to avoid those problems, developers have to work hard to control execution of threads. And when errors happen in a thread, the process will be affected.

## Why JavaScript is Single-threaded ?

As mentioned, Single-threaded is easy to program and control the tasks in a process. So it has disadvantage of Single-threaded. In order to limit the inconvenience and improve JavaScript programing language, they use the third party to execute some tasks while Javascript is running other tasks. This causes it to behave like multithreading languages, leading to async in JavaScript.
By this way, JavaScript can build applications with higher complexity but still be an easy programming language.
