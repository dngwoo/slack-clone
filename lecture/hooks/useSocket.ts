import io from 'socekt.io-client';

// socket은 cors가 걸리지 않기 떄문에 그냥 백엔드 주소 넣어주면 된다.
const backUrl = process.env.NODE_ENV === 'production'
  ? 'https://sleact.nodebird.com' : 'http://localhost:3095';

// 이 커스텀 훅은 spa에서 한번 연결을 맺었던 소켓을 컴포넌트에서 두고두고 재사용하기 위한 것임.
const sockets: { [key: string]: SocketIOClient.Socket } = {};
const useSocket = (workspace?: string): [SocketIOClient.Socket | undefined, ()=>void] => {
  if (!workspace) {
    return [undefined, disconnect];
  }
  if (!sockets[workspace]) {
    // http://localhost:3095/ws-sleact <- Sleact 채널에 있는 사람끼리 통신가능
    // 만약 1:1 메시지라면 제3자가 메세지를 받으면 안되기 때문에 추가적인 설정을 해줄 수 있다.
    // namspace와 room이라는 개념이 있다. 룸에 들어가면 그 룸안에 있는 사람들끼리만 통신이 가능하다.
    // socketio가 처음에 namespace와 room 두단계로 나눠놨음.
    // websocket을 쓰면 namespace와 room개념을 직접 구현해야 해서 어렵다.
    // 전체인한테 보내기, 특정인한테 보내기, 특정방한테 보내기, 나를 제외한 다른 사람에게 보내기 기능이 socketio가 구현해놓음.
    sockets[workspace] = io(`${backUrl}/ws-${workspace}`, {
      transport: ['websocket', 'polling'], // 최신브라우저는 ws로 돌아가지만 ie같은 경우는 http를 사용해야 되기 때문에 polling을 넣어준다.
    });
    console.info('create socket', workspace, sockets[workspace].id);
  }

  // 소켓을 끊기 위한 함수
  // 다른 워크스페이스로 넘어갈 때 기존 워크스페이스는 연결을 끊어야 할 때 사용한다.
  function disconnect() {
    if (workspace && sockets[workspace]) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }
  return [sockets[workspace], disconnect];
};

export default useSocket;

// 백엔드 설명

// socket.emit <- 클라이언트에서 서버로
// socket.on <- 서버에서 클라이언트로

// socket.on을 이용하여 onlineList를 클라이언트로 보내준다.
// 그러면 현재 채널에 로그인 되어져있는 유저들을 표시해준다.
