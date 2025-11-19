import interact from 'interactjs';

export function makeDraggable(selector){
  interact(selector).draggable({
    inertia:true,
    modifiers:[interact.modifiers.restrictRect({restriction:'parent',endOnly:true})],
    listeners:{
      move(event){
        const t=event.target;
        const x=(parseFloat(t.getAttribute('data-x'))||0)+event.dx;
        const y=(parseFloat(t.getAttribute('data-y'))||0)+event.dy;
        t.style.transform=`translate(${x}px,${y}px)`;
        t.setAttribute('data-x',x);
        t.setAttribute('data-y',y);
      }
    }
  });
}

export function makeResizable(selector){
  interact(selector).resizable({
    edges:{left:true,right:true,bottom:true,top:true},
    listeners:{move(event){
      let x=parseFloat(event.target.dataset.x)||0;
      let y=parseFloat(event.target.dataset.y)||0;
      Object.assign(event.target.style,{
        width:`${event.rect.width}px`,
        height:`${event.rect.height}px`,
        transform:`translate(${x}px,${y}px)`
      });
    }}
  });
}
