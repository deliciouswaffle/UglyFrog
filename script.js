async function changeContent() {
    let as = document.querySelectorAll('a');
    for (let v of as) {
        if (v.innerHTML.startsWith('https://playentry.org/profile/')) {

            id = v.innerHTML.slice(30,54);

            const response = await fetch(`https://dut-api-atobe1108.vercel.app/profile/${id}`)
            const json = await response.json();
            nick = json['data']['userstatus']['nickname'];
            userid = json['data']['userstatus']['username'];
            des = json['data']['userstatus']['description'];
            following = json['data']['userstatus']['status']['following'];
            follower = json['data']['userstatus']['status']['follower'];

            if (!des.includes('<')) {
                const userstatus = `<div class='yop'><br><span style="font-size:27px; white-space: nowrap; color: #000000; margin-left:10px; margin-right:15px;"><b>${nick}</b> (${userid})</span><br><br><span style="color: #000000; margin-left:10px;">팔로잉 </span><span style="color: rgb(22, 216, 163);">${following} </span><span>· </span><span style="color: #000000;">팔로워 </span><span style="color: rgb(22, 216, 163);">${follower}</span><br><br><span style="color: #000000; margin-left:10px; margin-right:15px;">${des}</span></a></div>`;
                v.innerHTML = userstatus;
            }
        }
    }
};

const targetNode = document.querySelector("body");
const observer = new MutationObserver(changeContent);
observer.observe(targetNode, { attributes: true, childList: true, subtree: true }); 


fetch('https://dut-api-atobe1108.vercel.app/profile/62e0f3af3d80d5006290ab89').then(r=>r.json()).then(r=>console.log(r['data']['userstatus']))
