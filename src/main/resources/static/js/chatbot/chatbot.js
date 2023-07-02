// 채팅 입력
const send = document.getElementById("send");
const display = document.getElementsByClassName("display-chatting")[0]


const sendMessage = () => {
	const inputChatting = document.getElementById("inputChatting");

	if (inputChatting.value.trim().length == 0) {
		alert("채팅을 입력해주세요.");
		inputChatting.value = "";
	} else {
		var obj = {
			"senderNo": loginMemberNo,
			"targetNo": selectTargetNo,
			"chattingNo": selectChattingNo,
			"messageContent": inputChatting.value,
		};
		console.log(obj)

		// JSON.stringify() : 자바스크립트 객체를 JSON 문자열로 변환
		chattingSock.send(JSON.stringify(obj));

		inputChatting.value = "";
	}
}

// 쉬프트 + 엔터 == 줄바꿈
inputChatting.addEventListener("keyup", e => {
	if(e.key == "Enter"){ 
		if (!e.shiftKey) {
			sendMessage();
		}
	}
})

var chatBtn= document.getElementsByClassName("chatbot-Button");
for(var chat of chatBtn){
	chat.addEventListener("click", e=> {
		const ul = document.querySelector(".display-chatting");
		
		// 메세지 만들어서 출력하기
		const li = document.createElement("li");
	
		// 메세지 내용
		const div = document.createElement("div");
		div.classList.add("chat");
		div.innerHTML = document.getElementById("inputChatting").value; // br태그 해석을 위해 innerHTML
	
		// 내가 작성한 메세지인 경우
		const memberNo = document.getElementById("inputChatting").getAttribute("memberNo")
		console.log(memberNo);
		if(memberNo == "0"){ 
			li.classList.add("my-chat");
			
			li.append(div);
			
		}else{ // 상대가 작성한 메세지인 경우
			
			li.classList.add("target-chat");
	
			// 팻봇
			// <img src="/resources/images/user.png">
			// const img = document.createElement("img");
			// img.setAttribute("src", selectTargetProfile);
			
			const div = document.createElement("div");
			const text = document.createElement("div");
			text=document.getElementById("")
			// 챗봇 이름
			const b = document.createElement("b");
			b.innerText = "(*°▽°*)"; // 전역변수
	
			const br = document.createElement("br");
	
			div.append(b, br, text);
			li.append(div);
		}
	
		ul.append(li)
		display.scrollTop = display.scrollHeight; // 스크롤 제일 밑으로
	})
}

const category = document.getElementsByClassName("chatbot-category");

Array.from(category).forEach(category => {
  category.addEventListener("click", e => {
    const ul = document.querySelector(".display-chatting");
		// 메세지 만들어서 출력하기
		const li = document.createElement("li");

		const div = document.createElement("div");

		div.classList.add("chat");
		li.classList.add("target-chat");
	
		// 챗봇 이름
		const category = document.createElement("div");
		category.classList.add("chatbot-category")
		category.innerText = e.target.innerText+ "관련 문의 카테고리입니다."; // 전역변수

		const br = document.createElement("br");

		div.append(category, br);
		li.append(div);

		ul.append(li)
		display.scrollTop = display.scrollHeight; // 스크롤 제일 밑으로

  });
});