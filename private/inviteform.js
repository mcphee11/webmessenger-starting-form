'use strict'

//Variables to change in your deployment
const deploymentId = 'ENTER_YOUR_DEPLOYMENTID' //Your WebMessenger DeploymentId
const hexColor = '#000000' //Color theme

function toggleMessenger() {
  Genesys(
    'command',
    'Messenger.open',
    {},
    function (o) {
      closeLauncher()
      Genesys('command', 'Database.set', {
        messaging: {
          customAttributes: {
            firstName: document.getElementById('fname').value,
            lastName: document.getElementById('lname').value,
            email: document.getElementById('email').value,
            case: document.getElementById('case').value,
            queueName: document.getElementById('queue').value,
          },
        },
      })
    },
    function (o) {
      Genesys('command', 'Messenger.close')
    }
  )
}

function closeLauncher() {
  let input = document.getElementById('input')
  input.hidden = true
  console.log('Hiding...')
}

function openLauncher() {
  let session = JSON.parse(localStorage.getItem(`_${deploymentId}:gcmcsessionActive`))
  let input = document.getElementById('input')
  console.log(session?.value)
  if (session?.value) {
    console.log('Opening Widget...')
    Genesys(
      'command',
      'Messenger.open',
      {},
      function (o) {
        closeLauncher()
      },
      function (o) {
        Genesys('command', 'Messenger.close')
      }
    )
  } else {
    console.log('showing...')
    input.hidden = false
  }
}

//Create Launcher
let launcher = document.createElement('button')
launcher.onclick = function () {
  openLauncher()
}
launcher.style = `cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -2px, rgba(0, 0, 0, 0.14) 0px 1px 4px 2px, rgba(0, 0, 0, 0.12) 0px 1px 4px 1px;
      position: fixed !important;
      bottom: 30px !important;
      width: 56px;
      height: 56px;
      right: 30px !important;
      border-radius: 50%;
      background-color: ${hexColor};
      z-index: 9999;
      border: 0px;`
launcher.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>`
document.body.appendChild(launcher)

//Create Input Form
let input = document.createElement('div')
let header = document.createElement('div')
let title = document.createElement('p')
let minButton = document.createElement('button')

let form = document.createElement('div')
let fnameL = document.createElement('label')
let fnameI = document.createElement('input')
let lnameL = document.createElement('label')
let lnameI = document.createElement('input')
let emailL = document.createElement('label')
let emailI = document.createElement('input')
let caseL = document.createElement('label')
let caseI = document.createElement('input')
let queueL = document.createElement('label')
let queueS = document.createElement('select')
let option1 = document.createElement('option')
let option2 = document.createElement('option')
let option3 = document.createElement('option')
let submit = document.createElement('button')

input.id = 'input'
input.hidden = true
input.style = `box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -2px, rgba(0, 0, 0, 0.14) 0px 1px 4px 2px, rgba(0, 0, 0, 0.12) 0px 1px 4px 1px;
      position: fixed !important;
      bottom: 30px !important;
      width: 408px;
      height: 648px;
      right: 30px !important;
      background-color: white;
      z-index: 99999;`
header.style = `display: inline-flex;
      background-color: ${hexColor};
      color: white;
      font-size: 1.33929rem;
      line-height: 2.6;
      font-weight: 400;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 'sans-serif';
      width: 100%;
      height: 60px;`
title.style = `margin: 0;
      padding-left: 25px;`
title.innerText = 'Please give us some info'
minButton.style = `position: absolute;
      width: 50px;
      right: 8px;
      top: 15px;
      cursor: pointer;
      filter: invert(1);
      border: 0;
      background-color: transparent`
minButton.onclick = function () {
  closeLauncher()
}
minButton.tabIndex = 0
minButton.ariaLabel = 'Minimize the Messenger'
minButton.innerHTML = `<svg id="svgid" viewBox="0 0 24 24" style="width: 26px; height: 26px;">
<title>window-minimize</title>
<path d="M19 13H5v-2h14v2z"></path>
</svg>`
header.appendChild(title)
header.appendChild(minButton)
input.appendChild(header)

form.style = `padding: 25px;`
fnameL.innerText = 'First Name'
fnameL.style = `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 'sans-serif';`
fnameI.id = 'fname'
fnameI.style = `      width: 100%; padding: 12px 20px; margin: 8px 0; display: inline-block; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;`
fnameI.placeholder = 'Your first name..'
lnameL.innerText = 'Last Name'
lnameL.style = `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 'sans-serif';`
lnameI.id = 'lname'
lnameI.style = `      width: 100%; padding: 12px 20px; margin: 8px 0; display: inline-block; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;`
lnameI.placeholder = 'Your last name..'
emailL.innerText = 'Email'
emailL.style = `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 'sans-serif';`
emailI.id = 'email'
emailI.style = `      width: 100%; padding: 12px 20px; margin: 8px 0; display: inline-block; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;`
emailI.placeholder = 'Your email address..'
caseL.innerText = 'Case'
caseL.style = `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 'sans-serif';`
caseI.id = 'case'
caseI.style = `      width: 100%; padding: 12px 20px; margin: 8px 0; display: inline-block; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;`
caseI.placeholder = 'Optional case number..'
queueL.innerText = 'Queue'
queueL.style = `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 'sans-serif';`
queueS.id = 'queue'
queueS.style = `    width: 100%;
padding: 12px 20px;
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;`
option1.value = 'sales'
option1.innerText = 'Sales'
option2.value = 'support'
option2.innerText = 'Support'
option3.value = 'general'
option3.innerText = 'General'
submit.style = `width: 100%;
background-color: ${hexColor};
color: white;
padding: 14px 20px;
margin: 100px 0 0 0;
border: none;
border-radius: 4px;
cursor: pointer;`
submit.innerText = 'Submit'
submit.onclick = function () {
  toggleMessenger()
}

queueS.appendChild(option1)
queueS.appendChild(option2)
queueS.appendChild(option3)
form.appendChild(fnameL)
form.appendChild(fnameI)
form.appendChild(lnameL)
form.appendChild(lnameI)
form.appendChild(emailL)
form.appendChild(emailI)
form.appendChild(caseL)
form.appendChild(caseI)
form.appendChild(queueL)
form.appendChild(queueS)
form.appendChild(submit)
input.appendChild(form)

document.body.appendChild(input)

//listen to screen sizing for mobile & dynamic pc
function sizeChanged() {
  if (window.innerWidth < 600 && screenSize != 'mobile') {
    screenSize = 'mobile'
    let input = document.getElementById('input')
    input.style.width = '100%'
    input.style.height = '100%'
    input.style.bottom = 0
    input.style.right = 0
  }
  if (window.innerWidth > 600 && screenSize != 'pc') {
    screenSize = 'pc'
    let input = document.getElementById('input')
    input.style.width = '408px'
    input.style.height = '648px'
    input.style.bottom = '30px'
    input.style.right = '30px'
  }
}

let screenSize = ''
window.addEventListener('resize',sizeChanged)
sizeChanged()
