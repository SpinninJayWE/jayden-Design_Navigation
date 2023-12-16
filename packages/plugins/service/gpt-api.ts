import {AuthStorage} from "../../main-navigation/src/providers/user";
import request, { BASE_URL } from ".";


export const getChatList = () => {
  return request.get('/chatgpts')
}

export const getChatSession = (id: string) => {
  return request.get(`/chatgpt/${id}`)
}

export const sendChat = async (id: string, message: string, streamCallBack?: (data: { done: boolean, delta: string, snapshot: string }) => void) => {
  
    return new Promise(async (resolve, reject) => {
      // 将数据转换为JSON字符串
      const postData = JSON.stringify({
        sessionId: id,
        input: message
      });
  
      // 使用fetch API发送POST请求
      const response = await fetch(`${BASE_URL}/api/chatgpt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ AuthStorage.getJwt()
        },
        body: postData,
      });
  
      // 检查响应是否成功
      if (!response.ok) {
        reject(`HTTP error! status: ${response.status}`)
      }
  
      // 使用流式处理响应体
      const reader = response.body?.getReader();
      let charsReceived = 0;
      let data = { done: false, delta: '', snapshot: '' };

      let index = 0
      if (reader) {
        // 读取数据流
        while (true) {
          index ++
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          const delta = new TextDecoder().decode(value, { stream: true });
          // 假设服务器使用UTF-8字符编码
          charsReceived += value.length;
          try {
            data = JSON.parse(delta.split('\n').pop() || 'null')
          } catch {
            console.error('parse error')
            continue
          }
          streamCallBack && streamCallBack(data)
        }
      } else {
        reject('no reader')
      }
      resolve(data)
    })
}

export const deleteSession = (id: string) => {
  return request.delete(`/chatgpt/${id}`)
}