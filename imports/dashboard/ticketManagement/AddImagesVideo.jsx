import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import Validation from 'react-validation';
import validator from 'validator';
import {Tracker} from 'meteor/tracker';
import { browserHistory } from 'react-router'; 
import { Link } from 'react-router';

export default class AddImagesVideo extends TrackerReact(Component){
	 constructor(props){
    super(props);
    this.state = { 
    }
  }

	render(){
     return( 
      <div>
       <div className="col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1 choosefilebox">
	        <div className="col-lg-12 wholeborder ">
	            <form action="/action_page.php">
		            <div className="imgtitile">
			          <div className="col-lg-12 Selectimg"> Select images:</div> 
				          <input type="file" className="col-lg-7" name="img" multiple />
			          </div>
	           </form>

	           <div className="col-lg-12 imgbox">
			        <div className="col-lg-3 imgbrPre">
				        <div className=" imgbr">
				        <img src="/images/priya-prakash.jpg" className="img1 img-responsive" />
				        <i class="fa fa-times-circle"></i>
				        </div>
			        </div>
			        <div className="col-lg-3 imgbrPre">
				        <div className=" imgbr">
					        <img src="/images/priya-prakash.jpg" className="img1 img-responsive" />
					        <i class="fa fa-times-circle"></i>
				        </div>
			        </div>
			        
	        </div>
	       </div>
      </div>

    <div className="col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1 choosefilebox">
       <div className="col-lg-12 wholeborder ">
	        <form action="/action_page.php">
	        <div className="imgtitile">
	          <div className="col-lg-12 Selectimg"> Select Video:</div> 
	          <input type="file" className="col-lg-7" name="video" multiple />
	          {/*<input type="submit" className="col-lg-1 btn btn-primary" />*/}
	          </div>
	        </form>
	        <div className="col-lg-12 imgbox">
		        <div className="col-lg-4 imgbrvid">
			        <video controls>
			          <source src="movie.mp4" type="video/mp4" />
			          <source src="movie.ogg" type="video/ogg" />
			          Your browser does not support the video tag.
			        </video>
		        </div>
		        
	        </div>

	      </div>
      </div>

        </div>
     ); 
   }        
}