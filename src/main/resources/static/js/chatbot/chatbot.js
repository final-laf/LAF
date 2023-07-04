
// 챗봇 움직임
document.getElementById("quickChatbot").addEventListener("click", e=> {
  if(document.getElementById("chatbotSection").style.display!="none"){
    document.getElementById("chatbotIcon").style.borderRadius="15px";
    document.getElementById("quickChatbot").style.display="none";
    document.getElementById("chatbotIcon").style.display="flex";
    document.getElementById("chatbotMain").style.display="none";
    document.getElementById("chatbotSection").classList.add("go");
    setTimeout(()=>{ 
      document.getElementById("chatbotSection").style.display="none"; // 스크롤 제일 밑으로
      document.getElementById("quickChatbot").style.display="flex";
    }, 650);
    return;
  }
  if (document.getElementById("chatbotSection").style.display=="none") {
    document.getElementById("chatbotIcon").style.display="none";
    document.getElementById("chatbotSection").style.display="flex"; // 스크롤 제일 밑으로
    document.getElementById("chatbotSection").classList.remove("go");
    document.getElementById("chatbotMain").style.display="flex";
    document.getElementById("quickChatbot").style.display="flex";
    return;
  }
})

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

    // const chat = document.getElementById("inputChatting").value
    // fetch("/chatbot/chat?chat="+chat)  
    // .then(response => response.json()) 
    // .then(answer => {
    //   console.log(answer)
    //   }
    // )
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
const ul = document.querySelector(".display-chatting");
const noAnswer = document.querySelectorAll(".chatbot-noAnswer");


Array.from(category).forEach(category => {
  category.addEventListener("click", e => {

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
      for(let i=0 ; i<answer.length; i++){
        console.log(answer[i].faqTitle);
        const category = document.createElement("div");
        category.classList.add("chatbot-answer")
        category.innerText = answer[i].faqTitle; // 전역변수
        category.setAttribute("answer", answer[i].faqContent)
        categoryList.append(category);
        category.addEventListener('click', answered);
        if (i>=4) {
          category.style.display="none";
        }
      }
      if(answer.length>4){
        const plus = document.createElement("div");
        plus.innerText = "더보기";
        plus.classList.add("chatbot-list");
        plus.setAttribute("length", "4");
        categoryList.append(plus);
        plus.addEventListener('click', plusBtn);
      }
      const text = document.createElement("div");
      text.innerText = "　　　　　╭(*°△°*)╮";
      categoryList.append(text)

      const category = document.createElement("div");
      category.classList.add("chatbot-noAnswer")
      category.innerText = "...원하는 답변이 없어요!"; // 전역변수
      categoryList.append(category)
      category.addEventListener('click', no);

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



// 답변 없을 경우
function no(e) {

      // 챗봇 영역
  // 메세지 만들어서 출력하기
  const li = document.createElement("li");
  li.classList.add("target-chat");
  
  // target 하위 div
  const targetChatContent = document.createElement("div")

  // chatbot
  const chatbot = document.createElement("div");
  chatbot.classList.add("chatbot");
  chatbot.innerText="　　╭(*ㅠ△ㅠ*)╮";

  // chat 영역
  const content = document.createElement("div");
  content.classList.add("chat");
  
  // text영역
  const text = document.createElement("div");
  text.innerHTML = "죄송합니다. <br>1:1 문의 게시판을 이용해주세요"; // 전역변수
  
  // 버튼 리스트
  const categoryList = document.createElement("div");
  
  // 버튼 개별
  const aTag = document.createElement("a"); 
  const category = document.createElement("div");
  category.innerText="1:1 문의 게시판으로 이동";
  aTag.href="/qna"
  category.classList.add("chatbot-category")
  aTag.append(category);
  categoryList.append(aTag);

  // 처음 카테고리 호출
  const categoryC = document.createElement("div")
  categoryC.innerText="처음 화면";
  categoryC.classList.add("chatbot-categoryList");
  categoryList.append(categoryC);
  
  
  content.append(text, categoryList);
  targetChatContent.append(chatbot, content);
  li.append(targetChatContent)
  ul.append(li)
  categoryC.addEventListener("click", mainCategory);
  setTimeout(()=>{ 
    display.scrollTop = display.scrollHeight; // 스크롤 제일 밑으로

  }, 50);
}

// 답변 있을 경우
function answered(e) {
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

  text.innerHTML = e.target.getAttribute("answer") + "<br><br><br>"; // 전역변수
  
  // 버튼 리스트
  const categoryList = document.createElement("div");
  
  // 버튼 개별

  const noText = document.createElement("div");
  noText.innerText = "　　　　　╭(*°△°*)╮";
  categoryList.append(noText)

  const noCategory = document.createElement("div");
  noCategory.classList.add("chatbot-noAnswer")
  noCategory.innerText = "...원하는 답변이 없어요!"; // 전역변수
  categoryList.append(noCategory)
  
  
  content.append(text, categoryList);
  targetChatContent.append(chatbot, content);
  li.append(targetChatContent)
  ul.append(li)

  noCategory.addEventListener('click', no);
  
  setTimeout(()=>{ 
    display.scrollTop = display.scrollHeight; // 스크롤 제일 밑으로

  }, 50);
}

function plusBtn(e){
  const leng = e.target.getAttribute("length")
  for (let i = leng; i < Number(leng)+4; i++){

    if(e.target.parentElement.children[i]!=null){
      e.target.parentElement.children[i].style.display="block"
    }
    if(e.target.parentElement.children[i]==null){
      e.target.style.display="none"
      return
    }
    e.target.getAttribute("length")   
  }
  e.target.setAttribute("length", Number(leng)+4)
  display.scrollTop = display.scrollHeight
}

/* 모달창 끄기 */
const chatModal = document.getElementById("chatbotSection")
window.addEventListener("keyup", e => {
  if (chatModal!=null) {
    if(chatModal.style.display != "none" && e.key == "Escape") {
        document.getElementById("chatbotIcon").style.borderRadius="15px";
        document.getElementById("quickChatbot").style.display="none";
        document.getElementById("chatbotIcon").style.display="flex";
        document.getElementById("chatbotMain").style.display="none";
        document.getElementById("chatbotSection").classList.add("go");
        setTimeout(()=>{ 
          document.getElementById("chatbotSection").style.display="none"; // 스크롤 제일 밑으로
          document.getElementById("quickChatbot").style.display="flex";
        }, 650);
        return;
      }
  }
});

function mainCategory() {
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
  text.innerHTML = "안녕하세요?? 반갑습니다. <br> Lost And Found ChatBot입니다.<br> 아래에서 원하시는 항목을 선택해주세요."; // 전역변수
  
  // 버튼 리스트
  const categoryList = document.createElement("div");
  
  // 버튼 개별
  const categoryL = ["상품", "배송", "교환", "기타"]
  for(let title of categoryL){
    const category = document.createElement("div");
    category.classList.add("chatbot-category")
    category.innerText = title; // 전역변수
    categoryList.append(category);
  }




  content.append(text, categoryList);
  targetChatContent.append(chatbot, content);
  li.append(targetChatContent)
  ul.append(li)

  // const br = document.createElement("br");

  display.scrollTop = display.scrollHeight; // 스크롤 제일 밑으로

  
}

