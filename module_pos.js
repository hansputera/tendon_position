

class tendon_pos{
	constructor( { hEdge, hMid, H, anchor_length, span, acuracy}){
		// init
		span = !span ? 1000 : span;
		acuracy = !acuracy ? 1 : acuracy;

		// calculating zEdge & zMid
		this.zEdge = H - hEdge;
		this.zMid = H - hMid;

		// calc A, B, C
		this.A = (this.zMid - this.zEdge)/(0.5*anchor_length)**2*1000;
		this.B = -this.A * (anchor_length/1000);
		this.C = hEdge/1000;

		// calc Z along anchor_length
		this.y_pos = [];

		this.Zi = ({x,A,B,C,acuracy}) => {
			x = x/1000
			return [x*span,this.round((A*x**2+B*x+C)*1000,acuracy)] 
		}

		this.round = (a,b) => {
			let rn = 10**b;
			return Math.floor(a*rn)/rn
		};

		// iteration for each x along anchor_length
		for(var i =0; i <= Math.floor(anchor_length/span); i++){
			var x = i == Math.floor(anchor_length/span) ? anchor_length : i*span;
			var opt = {
				x :x,
				A : this.A,
				B : this.B,
				C : this.C,
				acuracy : acuracy
			}
			this.y_pos.push(this.Zi(opt));
		}	

	}

}

module.exports =tendon_pos; 

// const { hEdge, hMid, H, anchor_length, span, acuracy} = require("./data.json")
// var t01 = new tendon_pos({ hEdge, hMid, H, anchor_length, span, acuracy});

// console.log(t01.y_pos);
