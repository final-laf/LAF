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

    const myLi = document.createElement("li"); 
    const myDiv = document.createElement("div");
		myDiv.classList.add("chat");
		myDiv.innerHTML = e.target.innerText;
    myLi.classList.add("my-chat")
    myLi.append(myDiv);

    // 챗봇 영역
    // 메세지 만들어서 출력하기
    const li = document.createElement("li");
    li.classList.add("target-chat");
    
    // target 하위 div
    const targetChatContent = document.createElement("div")

    // chatbot
    const chatbot = document.createElement("div");
    chatbot.classList.add("chatbot");
    chatbot.innerText="✧₊⁎ ╰((*°▽°*)╯ ⁎⁺✧";

    // chat 영역
    const content = document.createElement("div");
    content.classList.add("chat");
    
    // text영역
    const text = document.createElement("div");
    text.innerText = e.target.innerText+ "관련 문의 카테고리입니다."; // 전역변수
    
    // 버튼 리스트
    const categoryList = document.createElement("div");
    
    // 버튼 개별


    const categoryValue = e.target.innerText;
    fetch("/chatbot?categoryValue="+categoryValue)  
    .then(response => response.json()) 
    .then(answer => {
      console.log(answer)
      for(let i of answer){
        console.log(i.faqTitle);
        const category = document.createElement("div");
        category.classList.add("chatbot-category")
        category.innerText = i.faqTitle; // 전역변수
        categoryList.append(category);
      }

      const text = document.createElement("div");
      text.innerText = "　　　　　╭(*°△°*)╮";
      categoryList.append(text)

      const category = document.createElement("div");
      category.classList.add("chatbot-category")
      category.innerText = "...원하는 답변이 없어요!"; // 전역변수
      categoryList.append(category)
    }) 
    .catch (e => { console.log(e)}); 


    content.append(text, categoryList);
    targetChatContent.append(chatbot, content);
    li.append(targetChatContent)
		ul.append(myLi,li)



		// const br = document.createElement("br");

    setTimeout(()=>{ 
      display.scrollTop = display.scrollHeight; // 스크롤 제일 밑으로

		}, 50);
  });
});
document.getElementById("chatBtn").addEventListener("click", e=> {
  document.getElementById("chatbotSection").style.height=0 + 'px';
  setTimeout(()=>{ 
    document.getElementById("chatbotSection").style.width=0 + 'px';

  }, 150)
  setTimeout(()=>{ 
    document.getElementById("chatbotSection").style.display="none";

  }, 300)
})