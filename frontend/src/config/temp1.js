import {
  Intro1,
  Projects1,
  Skills1,
  Achievements1,
  Contact1,
} from "../components/Template1/index";
import NavBar1 from "../components/Template1/NavBar1";

// console.log(Intro1);

//#20b8cd
//#13343b
//#191a1a

const configs = {
  navBar: {
    name: NavBar1,
    details: {},
  },
  intro: {
    name: Intro1,
    details: {
      profilePic:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      name: "Rohan Phad",
      shortDesc: "I am Rohan Phad",
      longDesc: "jfashfsaeufhaewfhasdlfj",
    },
  },
  projects: {
    name: Projects1,
    details: {
      list: [
        {
          name: "Chat - App",
          desc: "A simple live chat Application",
        },
        {
          name: "Portfolio - Builder",
          desc: "Digital Portfolio Builder",
        },
      ],
    },
  },
  skills: {
    name: Skills1,
    details: {
      list: [
        {
          name: "C++",
        },
        {
          name: "Javascript",
        },
        {
          name: "Python",
        },
      ],
    },
  },
  achievments: {
    name: Achievements1,
    details: {
      list: [
        {
          name: "NTSE",
          desc: "Recieved NTSE Scholorship",
        },
        {
          name: "JEE",
          desc: "Achieved 4098 rank in JEE-Advanced 2021",
        },
      ],
    },
  },
  contact: {
    name: Contact1,
    details: {
      contactNum: "+91-8767978113",
    },
  },
};

export default configs;
