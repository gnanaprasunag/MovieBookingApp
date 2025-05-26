import {useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './snack.css'

//import CastImage from './CastImage'
export default function Snack(){

    const location = useLocation();
  const navigate=useNavigate()
    const {movie_name,language,locationselected,placeselected,selectedSeats,time,selectedDate} = location.state || {}; // Destructure the state if it exists
    
    const [added,setAdded]=useState([])
    const [names,setNames]=useState([])
    
  useEffect(() => {
    let namesArray = added.map((item) => item.name);
    setNames(namesArray);
  }, [added]);
        
    const snacks=[{name:'REGULAR POPCORN WITH TOPPINGS 90G',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727449236/irokii8jarjmwrifnktj.jpg',
        cal:'425 Kcal',
        allergens:'Milk',
        cost:310
    },
    {name:'MEDIUM POPCORN WITH TOPPINGS 180G',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727449236/irokii8jarjmwrifnktj.jpg',
        cal:'826 Kcal',
        allergens:'Milk',
        cost:410
    },
    {name:'REGULAR PEPSI 540ML',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445998/skheafq3weiewnjfesnm.jpg',
        cal:'232 Kcal',
        allergens:'Caffeine',
        cost:260
    },
    {name:'MEDIUM PEPSI 675 ML',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445998/skheafq3weiewnjfesnm.jpg',
        cal:'290 Kcal',
        allergens:'Caffeine',
        cost:290
    },
    {name:'CHICKEN TIKKA PIZZA 19CM',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727449095/thy3upxvopgrwqgqkjao.avif',
        cal:'217 Kcal/100g',
        allergens:'Milk,Soybeans,Gluten',
        cost:330
    },
    {name:'NACHOS WITH CHEESE & SASLSA 90G',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727449059/fbxdwj4plbc3vyltetbw.avif',
        cal:'665 Kcal',
        allergens:'Milk,Gluten',
        cost:310
    },
    {name:'BBQ GRILLED CHICKEN BURGER 170G',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727446396/lliftnncdtnfcimfocgo.png',
        cal:'489 Kcal',
        allergens:'Milk, Gluten',
        cost:220
    },
    {name:'COMBO 1(SALTED)',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727446367/gesnt0mtssozfk1exdnc.png',
        items:'Salted Popcorn 90g + Pepsi 540ml',
        cal:'597 Kcal',
        allergens:'Milk, Caffeine',
        cost:510
    },
    {name:'PANEER TIKKA ROLL 170G',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727448860/uon4wluddevqjbc70z28.avif',
        cal:'234 Kcal',
        allergens:'Milk,Wheat,Soybeans,Gluten',
        cost:220
    },
    {name:'NACHOS COMBO',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727448944/ffctwi6b5ctrakudvc5m.avif',
        items:'Nachos With Cheese & Salsa 90g + Pepsi 540ml',
        cal:'897 Kcal',
        allergens:'Milk,Gluten,Caffeine',
        cost:510
    },
    {name:'CHICKEN TIKKA SANDWICH 190G',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445923/kwf6rfkbcrdx1uk8ogwk.avif',
        cal:'530 Kcal',
        allergens:'Milk,Gluten,Wheat,Soybean,Mustard',
        cost:260
    },
    {name:'GREEN APPLE & CUCUMBER LEMONADE 450ML',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445953/p7bt3xhll9i7grbxgmcz.avif',
        cal:'234 Kcal',
        cost:250
    },
    {name:'PANEER TIKKA PIZZA 19CM',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445896/x0cguomsyjsughgbcuhz.avif',
        
        Allergens:'Milk,Whaet,Soybeans,Gluten',
        cal:'240 Kcal',
        cost:300
    },,
    {name:'CHICKEN TIKKA ROLL 170G',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727446668/szzkqt2avwwp8jiuqfw6.avif',
        cal:'265 Kcal',
        allergens:'Milk,,Wheat,Soybeans,Gluten,Mustard',
        cost:330
    },
    {name:'GARDEN FRESH VEGGIE FOCACCIA SANDWICH 190G',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445874/wgsuelpthufccgkziaz0.avif',
        cal:'287 Kcal',
        allergens:'Milk,Gluten,Wheat,Soybean,Mustard',
        cost:220
    },
    {name:'GARDEN VEGETABLE PIZZA 19CM',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445850/rihocn2vykqxtuabct4v.avif',
        cal:'272 Kcal/100g',
        allergens:'Milk,Gluten',
        cost:310
    },
    {name:'CHICKEN TIKKA LOADED FRIES 230G',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445821/uuwpeczbqbvxun0uprvr.avif',
        cal:'874 Kcal',
        Allergens:'Milk,Soybean,Gluten',
        cost:300
    },
    {name:'FRENCH FRIES 140G',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445798/ezy7tsb2qdodoyqdtmvx.avif',
        cal:'434 Kcal',
        cost:250,
        Allergens:'Soybean,Gluten',
    },
    {name:'CRISPY PANEER BURGER 170G',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445773/yuhbf7ccqizun12ts557.avif',
        cal:'653 Kcal',
        allergens:'Milk,Gluten,Wheat,Soybean',
        cost:240
    },
    {name:'SPICY GRILLED CHICKEN BURGER 170G',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727446747/nxsikrensbnflzwzdcwj.avif',
        cal:'669 Kcal',
        allergens:'Milk,Gluten,',
        cost:260
    },
    {name:'VEGETABLE PATTY WRAP 170G',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445740/h6rjkmty3ivhf3skxumn.avif',
        cal:'172 Kcal',
        allergens:'Milk,Gluten,',
        cost:220
    },
    {name:'COMBO 2(SALTED)',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445673/fofwccowviy3qeq1adb9.avif',
        items:'Salted Popcorn 90g +  Pepsi 540ml + Crispy paneer Burger 170g',
        cal:'597 Kcal',
        allergens:'Milk, Caffeine',
        cost:790
    },
    {name:'COMBO 3(SALTED)',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445716/l6f6xehfcotn48mm4fnh.avif',
        items:'Salted Popcorn 90g + Nachos with Cheese & Salsa 90g + 2 Pepsi 540ml',
        cal:'1360 Kcal',
        allergens:'Gluten, Caffeine',
        cost:1100
    },
    {name:'COMBO 4',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727446973/rkhvrzgbqrsgbizpil99.png',
        items:'Paneer Tikka Pizza 19cm + Crispy Paneer Burger 170g + Pepsi 540ml',
        cal:'2040 Kcal',
        allergens:'Milk,Wheat,Soybean,Gluten, Caffeine,',
        cost:1000
    },
    {name:'GREEN APPLE & CUCUMBER LEMONADE 450ML',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727446630/gxeevjyvsr0ieruyrzfx.avif',
        cal:'234 Kcal',
        cost:250
    },
    {name:'STRAWBERRY & MINT MOCKTAIL 450ML',
        url:'https://res.cloudinary.com/dxrbuyd4b/image/upload/v1727445625/hyzb7bhzrcootlm13aq5.avif',
        cal:'238 Kcal',
        cost:250
    },]
    const handleAdd = (name, cost) => {
        const existingItem = added.find((item) => item.name === name);
        if (existingItem) {
          setAdded(
            added.map((item) =>
              item.name === name ? { ...item, count: item.count + 1 } : item
            )
          );
        } else {
          setAdded([...added, { name, cost, count: 1 }]);
        }
      };
    
      const handleRemove = (name) => {
        setAdded(
          added
            .map((item) =>
              item.name === name
                ? { ...item, count: item.count > 1 ? item.count - 1 : 0 }
                : item
            )
            .filter((item) => item.count > 0)
        );
      };
    return(<div className="snack-container">
        
        <div className="selected-items">
          <h2>Selected Snacks</h2>
          {added.length === 0 ? (
            <p>No items added yet.</p>
          ) : (
            added.map((item, index) => (
              <div className="selected-item" key={index}>
                <h3>{item.name}</h3>
                <h4>Cost: ₹{item.cost}</h4>
                <h4>Quantity: {item.count}</h4>
              </div>
            ))
          )}
          <button
            className="next-btn"
            onClick={() =>
              navigate('/alldetails', {
                state: {
                  movie_name,
                  language,
                  locationselected,
                  placeselected,
                  selectedSeats,
                  time,
                  selectedDate,
                  added,
                },
              })
            }
          >
            Next
          </button>
        </div>
  
        {/* Snacks Grid */}
        <div className="snacks-container">
          <div className="snacks-grid">
            {snacks.map((snack, index) => (
              <div className="snack-card" key={index}>
                <img src={snack.url} alt={snack.name} className="snack-image" />
                <h3 className="snack-name">{snack.name}</h3>
                <p className="snack-calorie">Calories: {snack.cal}</p>
                <p className="snack-cost">Cost: ₹{snack.cost}</p>
                {snack.allergens && (
                  <p className="snack-allergens">Allergens: {snack.allergens}</p>
                )}
                <div className="snack-controls">
                  {names.includes(snack.name) ? (
                    <>
                      <button
                        className="snack-btn add-btn"
                        onClick={() => handleAdd(snack.name, snack.cost)}
                      >
                        +
                      </button>
                      <button
                        className="snack-btn"
                        onClick={() => handleRemove(snack.name)}
                      >
                        -
                      </button>
                    </>
                  ) : (
                    <button
                      className="snack-btn add-btn"
                      onClick={() => handleAdd(snack.name, snack.cost)}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>)
}

