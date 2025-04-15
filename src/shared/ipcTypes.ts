// 定义 IPC 通道名称和对应的类型
export interface IpcRequest {
  'PULL_DANMU': {
    args: {
      data: string;
      timestamp: Date;
    };
    return: void; // 无返回值或定义返回类型
  };
  // 可以添加其他通道...
}

// 可选：定义强类型的 IPC 包装器
export type IpcChannel = keyof IpcRequest;
