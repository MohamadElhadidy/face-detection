import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Component } from "react";
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: "",
    "name": "",
    "email": "",
    "entries": 0,
    "joined": '',
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }
  
  calculateFaceLocation = (response) => {
    const clarifyData = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageInput');
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifyData.left_col * width,
      topRow: clarifyData.top_row * height,
      rightCol: width - (clarifyData.right_col * width),
      bottomRow: height - (clarifyData.bottom_row * height)
    }
  }
  loadUser = (userData) => {
    this.setState({user :{
      id: userData.id,
      "name": userData.name,
      "email": userData.email,
      "entries": userData.entries,
      "joined": userData.joined
    }})
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
    }
    
  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }
  onRouteChange = (route)=>{
    if(route === 'home'){
      this.setState({ isSignedIn: true })
    }else{
      this.setState(initialState)
    }
    this.setState({ route: route })
  }
  onSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch("http://localhost:3000/imageURL", {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      })
    }).then(res => res.json())
      .then(outputs => {
        fetch("http://localhost:3000/image", {
          method: 'put',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id,
          })
        }).then(res => res.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          }).catch(console.log)
        this.displayFaceBox(this.calculateFaceLocation(outputs))
      })
      .catch(console.log)
    }


  render() {
    const { isSignedIn, imageUrl, box, route, user } = this.state
    const ParticlesOptions =
    {
      fps_limit: 30,
      interactivity: {
        detect_on: "canvas",
        events: {
          onclick: { enable: true, mode: "push" },
          onhover: {
            enable: true,
            mode: "attract",
            parallax: { enable: false, force: 60, smooth: 10 }
          },
          resize: true
        },
        modes: {
          push: { quantity: 4 },
          attract: { distance: 200, duration: 0.4, factor: 5 }
        }
      },
      particles: {
        color: { value: "#ffffff" },
        line_linked: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1
        },
        move: {
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
          bounce: false,
          direction: "none",
          enable: true,
          out_mode: "out",
          random: false,
          speed: 2,
          straight: false
        },
        number: { density: { enable: true, value_area: 800 }, value: 80 },
        opacity: {
          anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
          random: false,
          value: 0.5
        },
        shape: {
          character: {
            fill: false,
            font: "Verdana",
            style: "",
            value: "*",
            weight: "400"
          },
          image: {
            height: 100,
            replace_color: true,
            src: "images/github.svg",
            width: 100
          },
          polygon: { nb_sides: 5 },
          stroke: { color: "#000000", width: 0 },
          type: "circle"
        },
        size: {
          anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
          random: true,
          value: 5
        }
      },
      polygon: {
        draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.5 },
        move: { radius: 10 },
        scale: 1,
        type: "none",
        url: ""
      },
      retina_detect: true
    };

    const particlesInit = (async (engine) => {
      await loadFull(engine);
    }, []);
    return (
      <div className="App">
        <Particles
          className='particles'
          id="tsparticles"
          init={particlesInit}
          options={ParticlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        { route === 'home' ?
        <><Logo /><Rank  user={user}/><ImageLinkForm
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit} /><FaceRecognition box={box} imageUrl={imageUrl} /></>
          :
          (route === 'signin' ? 
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />)
        }
        </div>
    );
  }
}

export default App;
