import { ButtonMore } from "./Button.styles";
import PropTypes from 'prop-types';

export function Button ({onClick}) {
  
  return (
    <ButtonMore type="button" onClick={onClick} >
      Load more
    </ButtonMore>
  ); 
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};