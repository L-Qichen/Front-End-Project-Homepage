import leetCodeLogo from './imgs/leetCode.png';
import mdnLogo from './imgs/MDN.jpeg';
import reactLogo from './imgs/React.png';
import vueLogo from './imgs/Vue.png';
const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.lastLi');
let addNewURL = $(".addNewURL");
let cover = $(".cover");
const oldSiteList = localStorage.getItem('oldSiteList');
const oldSiteListToObj = JSON.parse(oldSiteList);
const hashMap = oldSiteListToObj || [
  { name: 'MDN', logoType: 'image', logoImg: mdnLogo, newURL: 'https://developer.mozilla.org/' },
  { name: 'Vue', logoType: 'image', logoImg: vueLogo, newURL: 'https://vuejs.org' },
  { name: 'React', logoType: 'image', logoImg: reactLogo, newURL: 'https://reactjs.org' },
  { name: 'leetCode', logoType: 'image', logoImg: leetCodeLogo, newURL: 'https://leetcode.com' },
];

const render = () => {
  $siteList.find('li:not(.lastLi)').remove();
  hashMap.forEach((node, index) => {
    if (node.logoType === 'image') {
      const $li = $(`
      <li>
        <div class="site">
          <div class="site-inner-container">
            <div class="logo"><img src="${node.logoImg}" alt="${node.name[0]}"></div>
            <div class="name">${node.name}</div>
          </div>
          <div class="deleteSite">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-more_operation"></use>
            </svg>
          <div>
        </div>
      </li>
    `).insertBefore($lastLi);
      $li.on('click', () => {
        window.open(node.newURL, '_self');
      });
      $li.on('click', '.deleteSite', (event) => {
        event.stopPropagation();
        const info = window.confirm("Are you sure you want to delete this shortcut?");
        if (info === true) {
          hashMap.splice(index, 1);
        }
        render();
      })
    } else {
      const $li = $(`
      <li>
        <div class="site">
          <div class="site-inner-container">
            <div class="logo">${node.name[0].toUpperCase()}</div>
            <div class="name">${node.name}</div>
          </div>
          <div class="deleteSite">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-more_operation"></use>
            </svg>
          <div>
        </div>
      </li>
    `).insertBefore($lastLi);
      $li.on('click', () => {
        window.open(node.newURL, '_self');
      });
      $li.on('click', '.deleteSite', (event) => {
        event.stopPropagation();
        const info = window.confirm("Are you sure you want to delete this shortcut?");
        if (info === true) {
          hashMap.splice(index, 1);
        }
        render();
      })
    };
  });
};

render();

const openAddForm = () => {
  addNewURL.css(`display`, 'flex');
  cover.css(`display`, `block`);
};

const closeAddForm = () => {
  addNewURL.css(`display`, 'none');
  cover.css(`display`, `none`);
};

const submitAddForm = () => {
  let newURLName = $("input[name='newURLName']").val();
  if (newURLName === null || newURLName === "") {
    alert("Name required.");
    return false;
  }
  let newURL = $("input[name='newURL']").val();
  if (newURL === null || newURL === "") {
    alert("URL required.");
    return false;
  }
  if (newURL.indexOf('http') !== 0) {
    newURL = 'https://' + newURL;
  }
  hashMap.push({
    name: newURLName,
    logoType: 'text',
    newURL: newURL,
  });
  render();
  closeAddForm();
}

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem('oldSiteList', string);
}

$(".addButton").on('click', openAddForm);
$(".cancel").on('click', closeAddForm);
$(".add").on('click', (event) => {
  submitAddForm();
  event.preventDefault();
});

const activeNav = (event) => {
  let trackNav = event.currentTarget.getAttribute(`class`);
  if (trackNav.indexOf('navItem') === 0) {
    $('.navItem1').removeAttr('style');
    $('.navItem2').removeAttr('style');
    $('.navItem3').removeAttr('style');
    $('.search-engine-logo').css('display', 'none');
    $(`.${trackNav}`).css('display', 'flex').css('background', '#4285f43d')
      .css('background', '#4285f43d').css('color', '#4285f4').css('border-radius', '24px')
      .css('padding', '0 10px').css('font-weight', '500');
    if (trackNav === 'navItem1') {
      $('.searchForm').attr('action', 'https://www.google.com/search');
      $('.searchForm').find('input').attr('name', 'q');
    } else if (trackNav === 'navItem2') {
      $('.searchForm').attr('action', 'https://www.baidu.com/s');
      $('.searchForm').find('input').attr('name', 'wd');
    } else if (trackNav === 'navItem3') {
      $('.searchForm').attr('action', 'https://www.bing.com/search');
      $('.searchForm').find('input').attr('name', 'q');
    }
  }
  $(`.${trackNav}>.search-engine-logo`).css('display', 'block');
};

const initEngine = () => {
  $('.navItem1').css('display', 'flex').css('background', '#4285f43d')
    .css('background', '#4285f43d').css('color', '#4285f4').css('border-radius', '24px')
    .css('padding', '0 10px').css('font-weight', '500');
  $('.navItem1>.search-engine-logo').css('display', 'block');
}
initEngine();
$('.nav-bar').find('div').on('click', activeNav);

$(document).on('keypress', (event) => {
  const { key } = event; // equal to const key = event.key;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].name[0].toLowerCase() === key) {
      window.open(hashMap[i].newURL, '_self');
    };
  };
}).on('keypress', 'input:focus', (event) => {
  event.stopPropagation()
});
