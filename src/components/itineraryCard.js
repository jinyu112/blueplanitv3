import React, { Component } from 'react'
import CONSTANTS from '../constants.js'
import Button from '@material-ui/core/Button';
import TooltipMat from '@material-ui/core/Tooltip';
import EditCostComponent from './editCostComponent.js';

class ItineraryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0
          }

        // <div>
        //                 <div className="showActions" key={key} id={"itinCard" + i}>
        //                 <div className="actions">
        //                     <div className="actionButtonDiv">
        //                     <Button className="lock-button" >
        //                         <label className="takeSpace" htmlFor={id}>
        //                             <TooltipMat placement="top" title={CONSTANTS.LOCK_TOOLTIP_STR}>
        //                                 {lock_icon}
        //                             </TooltipMat>
        //                         </label>
        //                         <input className="lock_checkbox" id={id} checked={this.state.checked[i]} onChange={this.handleCheckbox} type="checkbox" value={i} />
        //                     </Button>
        //                     </div>

        //                     <div className="actionButtonDiv">
        //                     <Button className="elim-button" variant="contained" color="secondary">
        //                         <label className="takeSpace" htmlFor={elim_id}>
        //                             <TooltipMat placement="top" title={elimToolTipStr}>
        //                                 {elim_icon}
        //                             </TooltipMat>
        //                         </label>
        //                         <input className="elim_checkbox" id={elim_id} checked={this.state.eliminated[i]} onChange={this.handleEliminate} type='checkbox' value={i} />
        //                     </Button>
        //                     </div>
        //                 </div>

        //                     <div className="itinRowContent" data-number={dataNumAttribute}>
        //                         <div className="resultsName icon-name itinEventCol3">
        //                             <div>
        //                                 <span className="align">
        //                                     {this.state.resultsArray[i].url === "" ? <strong>{truncate_name ? truncate_name : name}</strong> :
        //                                         <strong><a href={this.state.resultsArray[i].url} target='_blank'>{truncate_name ? truncate_name : name}</a></strong>}
        //                                     {/* {this.state.resultsArray[i].origin === 'noneitem' || this.state.resultsArray[i].origin === CONSTANTS.ORIGINS_USER ? '' : <MoreInfoButton value={i} onButtonClick={this.handleMoreInfo} />} */}

        //                                 </span>
        //                                 <div>
        //                                     <span>

        //                                         {this.state.itinTimes[i] == 'Food' ? 
        //                                             <div className="displayInline">
        //                                             <i className="fas fa-utensils"></i>
        //                                             </div>
        //                                             : <span className="boldIt">{this.state.itinTimes[i]}</span>
        //                                          } 

        //                                         {
        //                                             num_words_desc > 10 ? '' : (description === 0 || !description) ? '' : '- ' + description
        //                                         }    
        //                                         {                                           
        //                                         <div className="itinShortDesc">
        //                                             {
        //                                                 ((this.state.resultsArray[i].origin.localeCompare(CONSTANTS.ORIGINS_EB) === 0 ||
        //                                                 this.state.resultsArray[i].origin.localeCompare(CONSTANTS.ORIGINS_MU) === 0) && !isShortDescHTML) ? shortenedDesc : ''
        //                                             }
                                                    
        //                                         </div>
        //                                         }
        //                                         {
        //                                             num_words_desc > 10 ? 
        //                                             <div>
        //                                                 <Button id={'open-' + i} className="descBtn" variant="contained" color="primary" onClick={this.handleClickDescOpen}>
        //                                                     <span id={'open-span-' + i}>Read More</span>
        //                                                 </Button>
        //                                             </div> : ''
        //                                         }
        //                                     </span>
        //                                     {descDialog}
        //                                 </div>
        //                             </div>

        //                         </div>
        //                         <div className="itinEventCol4 edit-cost text-warning">
        //                             <div className="costPanel">
        //                                 <div className="edit-cost-cont">
        //                                     <EditCostComponent
        //                                         name={this.state.resultsArray[i].name}
        //                                         cost={this.state.resultsArray[i].cost}
        //                                         handleCostChange={this.handleEventCostChange}
        //                                         i_resultsArray={i}
        //                                         origin={this.state.resultsArray[i].origin}
        //                                     />
        //                                     {/* <ApproxCostToolTip
        //                                         approxCostFlag={this.state.resultsArray[i].approximateFee}
        //                                         origin={this.state.resultsArray[i].origin}
        //                                     /> */}
        //                                 </div>

        //                             </div>
        //                         </div>

                            
        //                     </div>
        //                     <div className="justify-end">
        //                             <a href={this.state.resultsArray[i].url} >
        //                             <img className="origin-logo" alt="" src={origins[origin]} />
        //                             </a>
        //                             </div>

        //                     <div className={moreInfoStyles.join(' ')}>
        //                         <MoreInfoView desc={this.state.resultsArray[i].description}
        //                             phone={this.state.resultsArray[i].phone}
        //                             address={this.state.resultsArray[i].address}
        //                             duration={this.state.resultsArray[i].duration}
        //                             otherInfo={this.state.resultsArray[i].other}
        //                             origin={this.state.resultsArray[i].origin}
        //                             thumbnail={this.state.resultsArray[i].thumbnail}
        //                             url={this.state.resultsArray[i].url}
        //                             approxFeeFlag={this.state.resultsArray[i].approximateFee}
        //                             defaultDurationFlag={this.state.resultsArray[i].defaultDuration}
        //                         />
        //                     </div>
        //                 </div>
        //             </div>

    }

    componentDidMount() {
        const height = this.divElement.clientHeight;
        this.setState({ height });
      }

    render() {
        var key=this.props.key;
        var i = this.props.cardIndex;
        var id = this.props.itineraryCardId;
        var lock_icon = this.props.lockIcon;
        var elim_icon = this.props.elimIcon;
        var checkedState = this.props.itinCardCheckedState; //this.state.checked[i]
        var elimState = this.props.itinCardElimState; //this.state.eliminated[i]
        var elim_id = this.props.elimId;
        var elimToolTipStr = this.props.elimToolTipStr;
        var dataNumAttribute = this.props.dataNumAttribute;
        var truncate_name = this.props.truncate_name;
        var url = this.props.url; //this.state.resultsArray[i].url
        var name = this.props.name;
        var itinTime = this.props.itinTime; //this.state.itinTimes[i]
        var num_words_desc = this.props.num_words_desc;
        var description = this.props.description;
        var origin = this.props.origin; // this.state.resultsArray[i].origin
        var isShortDescHTML = this.props.isShortDescHTML;
        var shortenedDesc = this.props.shortenedDesc; 
        var descDialog = this.props.descDialog;
        var cost = this.props.cost; //this.state.resultsArray[i].cost
        var origins = this.props.origins;

        const beofre ={
            before: this.state.height,
        }

        console.log("itineraryCard Height: " + this.state.height)
        return (
            <div ref={ (divElement) => this.divElement = divElement}>
                <div className="showActions" key={key} id={"itinCard" + i}>
                    <div className="actions">
                        <div className="actionButtonDiv">
                            <Button className="lock-button" >
                                <label className="takeSpace" htmlFor={id}>
                                    <TooltipMat placement="top" title={CONSTANTS.LOCK_TOOLTIP_STR}>
                                        {lock_icon}
                                    </TooltipMat>
                                </label>
                                <input className="lock_checkbox" id={id} checked={checkedState} onChange={this.props.handleCheckbox} type="checkbox" value={i} /> {/* this.handleCheckbox*/}
                            </Button>
                        </div>

                        <div className="actionButtonDiv">
                            <Button className="elim-button" variant="contained" color="secondary">
                                <label className="takeSpace" htmlFor={elim_id}>
                                    <TooltipMat placement="top" title={elimToolTipStr}>
                                        {elim_icon}
                                    </TooltipMat>
                                </label>
                                <input className="elim_checkbox" id={elim_id} checked={elimState} onChange={this.props.handleEliminate} type='checkbox' value={i} /> {/* this.handleEliminate*/}
                            </Button>
                        </div>
                    </div>

                    <div className="itinRowContent" data-number={dataNumAttribute}>
                        <div className="resultsName icon-name itinEventCol3">
                            <div>
                                <span className="align">
                                    {url === "" ? <strong>{truncate_name ? truncate_name : name}</strong> :
                                        <strong><a href={url} target='_blank'>{truncate_name ? truncate_name : name}</a></strong>}
                                </span>
                                <div>
                                    <span>

                                        {itinTime == 'Food' ?
                                            <div className="displayInline">
                                                <i className="fas fa-utensils"></i>
                                            </div>
                                            : <span className="boldIt">{itinTime}</span>
                                        }

                                        {
                                            num_words_desc > 10 ? '' : (description === 0 || !description) ? '' : '- ' + description
                                        }
                                        {
                                            <div className="itinShortDesc">
                                                {
                                                    ((origin.localeCompare(CONSTANTS.ORIGINS_EB) === 0 ||
                                                        origin.localeCompare(CONSTANTS.ORIGINS_MU) === 0) && !isShortDescHTML) ? shortenedDesc : ''
                                                }

                                            </div>
                                        }
                                        {
                                            num_words_desc > 10 ?
                                                <div>
                                                    <Button id={'open-' + i} className="descBtn" variant="contained" color="primary" onClick={this.props.handleClickDescOpen}> {/*this.handleClickDescOpen */}
                                                        <span id={'open-span-' + i}>Read More</span>
                                                    </Button>
                                                </div> : ''
                                        }
                                    </span>
                                    {descDialog}
                                </div>
                            </div>

                        </div>
                        <div className="itinEventCol4 edit-cost text-warning">
                            <div className="costPanel">
                                <div className="edit-cost-cont">
                                    <EditCostComponent
                                        name={name}
                                        cost={cost}
                                        handleCostChange={this.props.handleEventCostChange} //this.handleEventCostChange
                                        i_resultsArray={i}
                                        origin={origin}
                                    />
                                </div>

                            </div>
                        </div>


                    </div>
                    <div className="justify-end">
                        <a href={url} >
                            <img className="origin-logo" alt="" src={origins[origin]} />
                        </a>
                    </div>

                </div>
            </div>
        );
    }
}

export default ItineraryCard;




