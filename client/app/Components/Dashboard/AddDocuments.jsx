import React, { PropTypes, Components } from 'react';
import Link from 'react-router';
import { Card, CardActions, CardHeader, CardText } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
import LoadWebCam from './Webcam.jsx';


const DocumentsForm = ({ onChange, onSubmit, onClick, entities, documents, onUpdate }) => (

  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Upload Documents</h2>
      <div className="field-line">
        <TextField floatingLabelText="Alias" name="alias" onChange={onChange} value={documents.alias}/>
      </div>
      <div className="field-line">
        <Menu disableAutoFocus={true}>
          <MenuItem primaryText="Entity"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="Personal"
                rightIcon={<ArrowDropRight />}
                menuItems={[
                  <MenuItem value={"Male"} primaryText="Male" name="entity" onClick={onClick} />,
                  <MenuItem value={"Female"} primaryText="Female" name="entity" onClick={onClick}/>,
                  <MenuItem value={"Other"} primaryText="Other" name="entity" onClick={onClick}/>,
                  <MenuItem value={"Do not wish to specify"} primaryText="Do not wish to specify" name="entity" onClick={onClick}/>
                ]} />,
                <MenuItem primaryText="Business"
                  rightIcon={<ArrowDropRight />}
                  menuItems={[
                    <MenuItem value={"Limited Liability Company"} primaryText="Limited Liability Company" onClick={onClick}/>,
                    <MenuItem value={"Corporation"} primaryText="Corporation" onClick={onClick} />,
                    <MenuItem value={"Any Type of Partnership"} primaryText="Any Type of Partnership" onClick={onClick}/>,
                    <MenuItem value={"Sole Proprietorship"} primaryText="Sole Proprietorship" onClick={onClick}/>,
                    <MenuItem value={"Trust"} primaryText="Trust" onClick={onClick} />,
                    <MenuItem value={"Estate"} primaryText="Estate" onClick={onClick}/>
                  ]}
                />
            ]}
            />
        </Menu>
      </div>
      <div className="field-line">
        <Card>
          <CardHeader title="Entity Type" subtitle="Please choose an entity type" actAsExpander={true} showExpandableButton={true}/>
          <CardText expandable={true}>
          <Table onCellClick={onClick}>
            <TableBody>
              {entities.map( (entity, index) => (
                <TableRow key={index} name="type">
                  <TableRowColumn>{entity}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>
        </Card>
      </div>
      <div className="field-line">
        <DatePicker hintText="Date of Birth or Date of Founding" container="inline" name="dob" mode="landscape" onChange={onClick}/>
      </div>
      <div className="field-line">
        <Card>
          <CardHeader title="Address" actAsExpander={true} showExpandableButton={true}/>
          <CardText expandable={true}>
            <div className="field-line">
              <TextField floatingLabelText="Street" name="street" onChange={onChange} value={documents.street}/>
            </div>
            <div className="field-line">
              <TextField floatingLabelText="City" name="city" onChange={onChange} value={documents.city}/>
            </div>
            <div className="field-line">
              <TextField floatingLabelText="State" name="state" onChange={onChange} value={documents.state}/>
            </div>
            <div className="field-line">
              <TextField floatingLabelText="Zip Code" name="zipcode" onChange={onChange} value={documents.zipcode}/>
            </div>
            <div className="field-line">
              <TextField floatingLabelText="Country" name="country" onChange={onChange} value={documents.country}/>
            </div>
          </CardText>
        </Card>
      </div>
      <div className="field-line">
        <Card>
          <CardHeader title="Images" subtitle="Upload a Selfie" actAsExpander={true} showExpandableButton={true}/>
          <CardText expandable={true}>
            <LoadWebCam onClick={onUpdate}/>
          </CardText>
        </Card>
      </div>
      <div className="button-line">
        <RaisedButton type="submit" label="Update Documents" primary/>
      </div>
    </form>
  </Card>

);

DocumentsForm.propTypes = {
  entities: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default DocumentsForm;
