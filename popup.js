let scrapeEmails = document.getElementById('scrapeEmails')
let list = document.getElementById('emailList')
// handle to recieve emails from content recipts 

chrome.runtime.onMessage.addListener((request,sender,senderResponse)=>{

    //Get Emails

    let emails = request.emails;


   // alert(emails);


   // Display emails 
    if ( emails == null || emails.length == 0){
        // no  emails
        let div = document.createElement("div");
        div.innerText = 'No emails found';
        list.appendChild(div);

    }else {
        // display emails 

        emails.forEach((email)=>{
            let li = document.createElement('li');
            li.innerText = email ; 
            list.appendChild(li);
        })
    }

})


scrapeEmails.addEventListener("click", async ()=>{
    // Get the current active tab 

    let [tab] = await chrome.tabs.query({active:
        true, currentWindow:true});

         // Extension script to parse emails on page 
        chrome.scripting.executeScript({
            target : {tabId : tab.id},
            func:scrapeEmailsFromPage,

        });
 })

// buttons click event listener 
// Function to Scrape Emails 
function scrapeEmailsFromPage(){
    
    const emailReqEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim; 
    let emails = document.body.innerHTML.match(emailReqEx);

    //alert(emails);


    chrome.runtime.sendMessage({emails});

    
}