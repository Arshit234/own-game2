AFRAME.registerComponent('change-color-on-hover', {
    schema: {
      color: {default: 'red'}
    },
    init: function () {
      var data = this.data;
      var el = this.el;
      var defaultColor = el.getAttribute('material').color;
      el.addEventListener('mouseenter', function () {
        el.setAttribute('color', data.color);
      });
      el.addEventListener('mouseleave', function () {
        el.setAttribute('color', defaultColor);
      });
    }
  });

  AFRAME.registerComponent('collison-check', {
    schema: {
      el: {
        type: 'selector'
      },
      radius: {
        default: 0
      },
      otherRadius: {
        default: 0
      },
      score:{
        type: 'int',
        default: 0
      },
      colliding:{
        default: false
      }
    },
    tick: function () {
      var el1 = this.el;
      var el2 = this.data.el;
      var dist = el1.object3D.getWorldPosition().distanceTo(el2.object3D.getWorldPosition());
      var entity = document.querySelector('#score');
      if (dist < this.data.radius + this.data.otherRadius) {
        if (!this.data.colliding){
          this.data.score++;
          this.data.colliding = true;
          entity.emit('updateScore');
          AFRAME.utils.entity.setComponentProperty(entity, 'text.value', "score \n" + this.data.score);
        }
      } else {
        this.data.colliding = false;
      }
    }
  });