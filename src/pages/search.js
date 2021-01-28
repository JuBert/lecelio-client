import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const searchClient = algoliasearch(
  'F9LMWFT8SA',
  '497f9aba4ef7f7d6c1abac5cc92faa27'
);

class search extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div style={{ maxWidth: '960px', overflow: 'hidden', margin: '0 auto' }}>
        <h1>React InstantSearch e-commerce demo</h1>
        <InstantSearch indexName="wines" searchClient={searchClient}>
          <div style={{ float: 'left', width: '250px' }}>
            <ClearRefinements />
            <h2>Variants</h2>
            <RefinementList attribute="culture" />
            <Configure hitsPerPage={8} />
          </div>
          <div style={{ marginLeft: '260px' }}>
            <SearchBox translations={{ placeholder: 'Search for wines' }} />
            <Hits hitComponent={Hit} />
          </div>
        </InstantSearch>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <div>
      <Card
        style={{
          display: 'flex',
          marginTop: '1em',
          marginBottom: '1em',
        }}
      >
        <CardMedia
          style={{ width: 151 }}
          image={props.hit.wineImage}
          title={props.hit.name}
          alt={props.hit.name}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flex: '1 0 auto' }}>
            <Typography component="h5" variant="h5">
              {props.hit.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {props.hit.country}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default search;
