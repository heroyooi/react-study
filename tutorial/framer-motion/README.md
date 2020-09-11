# Framer Motion Example

```command
npm i framer-motion@1.10.3
```
```JavaScript
import { motion } from 'framer-motion';
```
- framer-motion 설치 및 연결 ie11 지원

## 초기값과 애니메이션 이후 값, transition 상세한 값 조절
```JavaScript (Header.js)
<motion.div className="title"
  initial={{ y: -250 }}
  animate={{ y: -10 }}
  transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
>
  <h1>Pizza Joint</h1>
</motion.div>
```

<hr />

## 버튼에 호버효과
```JavaScript (Base.js)
<ul>
  {bases.map(base => {
    let spanClass = pizza.base === base ? 'active' : '';
    return (
      <motion.li key={base} onClick={() => addBase(base)}
        whileHover={{ scale: 1.3, originX: 0, color: '#f8e112' }}
        transition={{ stype: 'spring', stiffness: 300 }}    
      >
        <span className={spanClass}>{ base }</span>
      </motion.li>
    )
  })}
</ul>

<motion.button
  whileHover={{
    scale: 1.1,
    textShadow: '0px 0px 8px rgb(255,255,255)',
    boxShadow: '0px 0px 8px rgb(255,255,255)',
  }}
>Next</motion.button>
```

<hr />

## Variants 사용 예제

```JavaScript (Base.js)
<motion.div className="base container"
  initial={{ x: '100vw' }}
  animate={{ x: 0 }}
  transition={{ type: 'spring', delay: 0.5 }}
>{/*...*/}</motion.div>
```
- 적용 전

```JavaScript (Base.js)
const containerVariants = {
  hidden: {
    opacity: 0,
    x: '100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      delay: 0.5
    }
  }
}
const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: '0px 0px 8px rgb(255,255,255)',
    boxShadow: '0px 0px 8px rgb(255,255,255)',
    transition: {
      duration: 0.3,
      yoyo: Infinity
    }
  }
}
// ...

<motion.div className="base container"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {/*...*/}
  <motion.button
    variants={buttonVariants}
    whileHover="hover"
  >Next</motion.button>
</motion.div>
```
- 적용 후

<hr />

## AnimatePresence 사용 예제
```JavaScript (Order.js)
const Order = ({ pizz }) => {
  const [showTitle, setShowTitle] = useState(true);
    setTimeout(() => {
      setShowTitle(false);
  }, 4000);

  return (
    <AnimatePresence>
      {showTitle && (
        <motion.h2
          exit={{ y: -1000 }}
        >Thank you for your order :)</motion.h2>
      )}
    </AnimatePresence>
  )
}
```

## Animating Routes
```JavaScript (App.js)
function App() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.key}>
        {/*...*/}
      </Switch>
    </AnimatePresence>
  );
}
```
```JavaScript (Home.js)
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 1.5 }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut' }
  }
}

const Home = () => {
  return (
    <motion.div className="home container"
      variatns={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >{/*...*/}</motion.div>
  )
}
```

## useCycle
```JavaScript (Loader.js)
import { motion, useCycle } from 'framer-motion';

const loaderVariants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: 'easeOut'
      }
    }
  },
  animationTwo: {
    y: [0, -40],
    x: 0,
    transition: {
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: 'easeOut'
      }
    }
  }
}

const Loader = () => {
  const [animation, cycleAnimation] = useCycle("animationOne", "animationTwo");
  
  return (
    <>
    <motion.div className="loader"
      variants={loaderVariants}
      animate={animation}
    >
    </motion.div>
    <div onClick={() => cycleAnimation()}>Cycle Loader</div>
    </>
  )
};
```

## Dragging Items & Wrap Up
```JavaScript (Header.js)
<motion.div className="logo"
  drag
  dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
  dragElastic={2}
>
```