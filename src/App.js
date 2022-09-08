import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Component } from "react";
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'a34fa1d0f70d42a18e236da1247d8b46'
});

class  App extends Component {
  constructor(){
    super()
    this.state={
      input:'',
      imageUrl:''
    }
  }
  onInputChange = (event)=>{
    this.setState({ input: event.target.value })
  } 
  onSubmit = ()=>{
    this.setState({ imageUrl: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then((response) =>{
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
    }).catch((err) =>{
      console.log(err)
    })
  }
  render(){
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
      options={ParticlesOptions}/>
    <Navigation/>
    <Logo />
    <Rank />
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onSubmit={this.onSubmit} />
    
      <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  );
  }
}

export default App;
