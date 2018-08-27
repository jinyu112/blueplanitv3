import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import CONSTANTS from '../constants.js';
import misc from '../miscfuncs/misc.js';
import placeholder from '../images/placeholder.png';
import ApproxCostToolTip from './approxCostToolTip.js';
import TooltipMat from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import renderHTML from 'react-render-html';

const styles = theme => ({
    card: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  });

// This component constructs a single result that is displayed to the user from the api data
export class SingleResult extends Component {
    constructor(props) {
        super(props);
        this.state ={
            expanded: false,
        }
    }

    //
    handleAddEvent = (e) => {
        // if (e.target.checked) {
            var tempObj = this.props.itinObj;
            tempObj["other"]=this.props.eventKey;
            this.props.AddEvent(tempObj);
        // }
    }

    truncateText = (string) => {
        if (string.length > 50) {
            string = string.substring(0, string.length - (string.length - 60));
            string = string + ' ...';
            return string;
        } else {
            return string;
        }
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
      };

    render() {
        var titleStr = this.truncateText(this.props.itinObj.name);
        var urlStr = this.props.itinObj.url;
        var imgUrlStr = this.props.itinObj.thumbnail ? this.props.itinObj.thumbnail : placeholder;
        var timeStr = misc.convertMilTime(this.props.itinObj.time);
        var costStr = this.props.itinObj.cost;
        var approxCostFlag = this.props.itinObj.approximateFee;
        var desc = this.props.itinObj.description;
        var origin = this.props.itinObj.origin;
        var subHeaderTxt="";
        if (origin === CONSTANTS.ORIGINS_EB) {
            subHeaderTxt = "EVENTBRITE.COM";            
        }
        else if (origin === CONSTANTS.ORIGINS_GP) {
            subHeaderTxt = "GOOGLE PLACES";
        }
        else if (origin === CONSTANTS.ORIGINS_MU) {
            subHeaderTxt = "MEETUP.COM"
        }
        else if (origin === CONSTANTS.ORIGINS_SG) {
            subHeaderTxt = "SEATGEEK.COM"
        }
        else if (origin === CONSTANTS.ORIGINS_YELP) {
            subHeaderTxt = "YELP.COM";
        }
        return (

<Card>
        <CardHeader
          title={<a href={urlStr} target='_blank'>{titleStr}</a>}
          subheader={subHeaderTxt}
        />
        <CardMedia
        className="singleResultImg"
          image={imgUrlStr}
          title="Contemplative Reptile"
        />
        {/* <CardContent>
          <Typography component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent> */}
        <CardActions  style={{justifyContent: 'center'}}>
        <TooltipMat placement="top" title={CONSTANTS.ADDTOITIN_TOOLTIP_STR}>
          <IconButton aria-label="Add to favorites"  onClick={this.handleAddEvent}>
            <FavoriteIcon />
          </IconButton>
          </TooltipMat>

          <Typography>
          {timeStr}
            </Typography>
            <Typography>
          ${costStr}<ApproxCostToolTip approxCostFlag={approxCostFlag} origin={origin}/>
            </Typography>
          <IconButton
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              Description:
            </Typography>
            <Typography >
            {renderHTML(desc)}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>

            // <div>
            //     <table className="singleApiResult">
            //         <tbody>
            //         <tr>
            //             <td colSpan="3">
            //                 <a href={urlStr} target='_blank'><img className="singleResultImg" src={imgUrlStr} /></a>
            //             </td>
            //         </tr>
            //         </tbody>

            //         <tbody>
            //         <tr>
            //             <td colSpan="3">
            //             <a href={urlStr} target='_blank'>{titleStr}</a></td>
            //         </tr>
            //         </tbody>
            //         <tbody>
            //         <tr>
            //             <td>
            //             <TooltipMat placement="top" title={CONSTANTS.ADDTOITIN_TOOLTIP_STR}>
            //                 <input key={titleStr} type="checkbox" onChange={this.handleAddEvent}/>
            //                 </TooltipMat>
            //                 </td>
            //                 <td>{timeStr}</td>
            //                 <td>
            //                     ${costStr}<ApproxCostToolTip approxCostFlag={approxCostFlag} origin={origin}/>                        
            //                 </td>

            //         </tr>
            //         </tbody>
            //     </table>
            // </div>
        )
    }
}

export default SingleResult;
