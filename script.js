async function changeContent() {

  // Setting

  if (document.querySelector('.css-2t9bm8') && document.querySelector('#search').placeholder !== '검색할 유저의 닉네임을 입력해 주세요') {
    document.querySelector('#search').placeholder='검색할 유저의 닉네임을 입력해 주세요';
    document.querySelector('.css-mgd7a8').remove();
    document.querySelector('.css-rnernm').remove();
    document.querySelector('.css-2t9bm8').style.height='100px';
  }

  // ChangeToDefaultProfile

  if (document.querySelector('.css-as31jq')) {
    const image = document.querySelector('.css-1g6ghgw');
    if (image.ariaLabel !== '이미지 제거') {
      image.setAttribute('aria-label', '이미지 제거');
    };

    image.addEventListener('click', function() {
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const xToken = JSON.parse(document.getElementById("__NEXT_DATA__").innerText).props.initialState.common.user.xToken;

      fetch("https://playentry.org/graphql", {
        "headers": {
          "content-type": "application/json",
          "csrf-token": csrfToken,
          "x-token": xToken
        },
        "body": "{\"query\":\"\\n    mutation UPDATE_USERINFO (\\n        $profileImage: String, \\n        $coverImage: String, \\n        $description: String,\\n        $nickname: String,\\n        $gender: String\\n        $mobileKey: String\\n    ) {\\n        updateUserInfo(\\n            profileImage: $profileImage, \\n            coverImage: $coverImage, \\n            description: $description\\n            nickname: $nickname\\n            gender: $gender\\n            mobileKey: $mobileKey\\n        ) {\\n            \\n    status\\n    result\\n\\n        }\\n    }\\n\",\"variables\":{\"profileImage\":\"648971f37fab1d33734e2b95\"}}",
        "method": "POST"
      });

      location.reload();
    });
  }

  // SearchUser

  document.addEventListener('keypress', function(event) {
    var searchElement = document.querySelector('.css-2t9bm8');
    var searchInput = document.querySelector('#search');
    
    if (event.key === 'Enter' && searchElement && searchInput.value.trim() !== '') {
      var searchValue = searchInput.value;

      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const xToken = JSON.parse(document.getElementById("__NEXT_DATA__").innerText).props.initialState.common.user.xToken;
  
      fetch("https://playentry.org/graphql", {
        "headers": {
          "content-type": "application/json",
          "CSRF-Token": csrfToken,
          "x-token": xToken
        },
        "body": `{"query":"query($nickname: String) {user(nickname:$nickname){id}}","variables":{"nickname":"${searchValue}"}}`,
        "method": "POST",
      })
      .then(response => response.json())
      .then(data => {
        const username = data.data.user.id;
        location.href=`https://playentry.org/profile/${username}`
        
        async function getUserStatus() {
          let csrf = await fetch("https://playentry.org");
          let body = await csrf.text();
          console.log(1);
          const cookie = csrf.headers.get('set-cookie');
          const index = body.indexOf("csrf-token") + 21;
          const csrfToken = body.slice(index, index + 36);
  
          fetch("https://playentry.org/graphql", {
            "headers": {
              "content-type": "application/json",
              "CSRF-Token": `${csrfToken}`,
              "cookie": `${cookie}`
            },
            "body": `{\"query\":\"\\n    query FIND_USERSTATUS_BY_USERNAME($id: String) {\\n        userstatus(id: $id) {\\n            id\\n            nickname\\n            username\\n            description\\n            shortUrl\\n            profileImage {\\n                \\n    id\\n    name\\n    label {\\n        \\n    ko\\n    en\\n    ja\\n    vn\\n\\n    }\\n    filename\\n    imageType\\n    dimension {\\n        \\n    width\\n    height\\n\\n    }\\n    trimmed {\\n        filename\\n        width\\n        height\\n    }\\n\\n            }\\n            coverImage {\\n                \\n    id\\n    name\\n    label {\\n        \\n    ko\\n    en\\n    ja\\n    vn\\n\\n    }\\n    filename\\n    imageType\\n    dimension {\\n        \\n    width\\n    height\\n\\n    }\\n    trimmed {\\n        filename\\n        width\\n        height\\n    }\\n\\n            }\\n            role\\n            studentTerm\\n            status {\\n                project\\n                projectAll\\n                study\\n                studyAll\\n                community {\\n                    qna\\n                    tips\\n                    free\\n                }\\n                following\\n                follower\\n                bookmark {\\n                    project\\n                    study\\n                }\\n                userStatus\\n            }\\n        }\\n    }\\n\",\"variables\":{\"id\":\"${username}\"}}`,
            "method": "POST",
          })
          .then(response => response.json())
          .then(data => {
            const json = data;
  
            const nick = json['data']['userstatus']['nickname'];
            const pImageName = json['data']['userstatus']['profileImage']['filename'];
            const pImageType = json['data']['userstatus']['profileImage']['imageType'];
  
            const profileImage = `https://playentry.org/uploads/${pImageName.slice(0,2)}/${pImageName.slice(2,4)}/${pImageName}.${pImageType}`;
          });
        }
  
        getUserStatus();
      })
    }
  });

  // UserStatPreview

  let as = document.querySelectorAll('a');
  for (let v of as) {
    if (v.innerHTML.startsWith('https://playentry.org/profile/')) {
      let id = v.innerHTML.slice(30, 54);

      async function getUserStatus() {
        let csrf = await fetch("https://playentry.org");
        let body = await csrf.text();
        console.log(1);
        const cookie = csrf.headers.get('set-cookie');
        const index = body.indexOf("csrf-token") + 21;
        const csrfToken = body.slice(index, index + 36);

        fetch("https://playentry.org/graphql", {
          "headers": {
            "content-type": "application/json",
            "CSRF-Token": `${csrfToken}`,
            "cookie": `${cookie}`
          },
          "body": `{\"query\":\"\\n    query FIND_USERSTATUS_BY_USERNAME($id: String) {\\n        userstatus(id: $id) {\\n            id\\n            nickname\\n            username\\n            description\\n            shortUrl\\n            profileImage {\\n                \\n    id\\n    name\\n    label {\\n        \\n    ko\\n    en\\n    ja\\n    vn\\n\\n    }\\n    filename\\n    imageType\\n    dimension {\\n        \\n    width\\n    height\\n\\n    }\\n    trimmed {\\n        filename\\n        width\\n        height\\n    }\\n\\n            }\\n            coverImage {\\n                \\n    id\\n    name\\n    label {\\n        \\n    ko\\n    en\\n    ja\\n    vn\\n\\n    }\\n    filename\\n    imageType\\n    dimension {\\n        \\n    width\\n    height\\n\\n    }\\n    trimmed {\\n        filename\\n        width\\n        height\\n    }\\n\\n            }\\n            role\\n            studentTerm\\n            status {\\n                project\\n                projectAll\\n                study\\n                studyAll\\n                community {\\n                    qna\\n                    tips\\n                    free\\n                }\\n                following\\n                follower\\n                bookmark {\\n                    project\\n                    study\\n                }\\n                userStatus\\n            }\\n        }\\n    }\\n\",\"variables\":{\"id\":\"${id}\"}}`,
          "method": "POST",
        })
          .then(response => response.json())
          .then(data => {
            const json = data;

            const nick = json['data']['userstatus']['nickname'];
            const userid = json['data']['userstatus']['username'];
            const des = json['data']['userstatus']['description'];
            const following = json['data']['userstatus']['status']['following'];
            const follower = json['data']['userstatus']['status']['follower'];
            const pImageName = json['data']['userstatus']['profileImage']['filename'];
            const pImageType = json['data']['userstatus']['profileImage']['imageType'];

            const profileImage = `https://playentry.org/uploads/${pImageName.slice(0,2)}/${pImageName.slice(2,4)}/${pImageName}.${pImageType}`;

            if (!des.includes('<') && !id.includes('<') && !id.includes('"')) {
              const userstatus = `<div class='statusBox'><br><img src="${profileImage}" alt="${nick}'s ProfileImage" class="pImage"><div class='disc'><div class='info'><div class='name hide-text-overflow'><span style="color: #000000;"><b>${nick}</b> (${userid})</span></div><div class='follow'><span style="color: #000000;">팔로잉 </span><span style="color: rgb(22, 216, 163);">${following} </span><span>· </span><span style="color: #000000;">팔로워 </span><span style="color: rgb(22, 216, 163);">${follower}</span></div></div><div class='userDesBox hide-text-overflow'><span class="userDes">${des}</span></div></div></div>`;
              v.innerHTML = userstatus;
              if (des===' ') {
                  document.querySelector('.userDes').remove();
                  document.querySelector('.statusBox').style.height='260px';
              }
            }
          });
      }

      await getUserStatus();
    }
  }
}

const targetNode = document.querySelector("body");
const observer = new MutationObserver(changeContent);
observer.observe(targetNode, { attributes: true, childList: true, subtree: true });

fetch('https://dut-api-atobe1108.vercel.app/profile/62e0f3af3d80d5006290ab89').then(r => r.json()).then(r => console.log(r['data']['userstatus'])); 