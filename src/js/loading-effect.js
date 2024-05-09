function loadingEffect(type) {
    const pointOne = document.getElementById(`point1-${type}`);
    const pointTwo = document.getElementById(`point2-${type}`);
    const pointThree = document.getElementById(`point3-${type}`);

    
    function showPoints() {
        pointOne.style.display = 'none';
        pointTwo.style.display = 'none';
        pointThree.style.display = 'none';
    
        setTimeout(() => {
            pointOne.style.display = 'inLine';
        }, 300);  
                
        setTimeout(() => {
            pointTwo.style.display = 'inLine'
        }, 600);

        setTimeout(() => {
            pointThree.style.display = 'inLine'
        }, 900);           
    }
    
    setInterval(() => {
       showPoints(); 
    }, 1000);
}

export {loadingEffect};
