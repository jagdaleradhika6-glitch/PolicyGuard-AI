export default {
  content:["./index.html","./src/**/*.{js,jsx}"],
  theme:{ extend:{
    colors:{ brand:{ 500:'#6366f1', 600:'#4f46e5', 700:'#4338ca' } },
    backgroundImage:{ 'hero-gradient':'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#312e81 100%)' },
    animation:{ 'float':'float 6s ease-in-out infinite', 'fade-up':'fadeUp .6s ease-out both' },
    keyframes:{
      float:{ '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(-12px)'} },
      fadeUp:{ '0%':{opacity:0,transform:'translateY(20px)'}, '100%':{opacity:1,transform:'translateY(0)'} }
    }
  }},
  plugins:[]
}
