import styled from "styled-components";
import { Link } from 'react-router-dom';
import {
	color,
	colorScheme,
	fontSizing,
	flex,
	breakpoints
} from "../DesignComponents/theme";

export const TransactionListContainer = styled.div`
    width: 90%;
    ${flex("column", "center", "center")}
    max-width: 900px;
    padding: 20px 10px;
    border: 1px solid ${colorScheme.secondaryBorderColor}
    border-radius: 5px;
    box-shadow: 0 8px 6px -6px rgba(0,0,0,0.75);
    font-size: ${fontSizing.sm}

    @media ${breakpoints[0]} {
      h1 {
        font-size: ${fontSizing.m}
      }
    }

  `;

export const TransactionInfoContainer = styled.div`
  ${flex("column")};
  width: 80%;
  min-width: 300px;
  max-width: 900px;
  margin: 20px 0;
  border: 1px solid ${colorScheme.secondaryBorderColor}
  border-radius: 5px;
  box-shadow: 0 8px 6px -6px rgba(0,0,0,0.75);

  header {
    width: 100%;
    ${flex("row", "center", "flex-end")};
    margin: 0;
    padding: 10px;
    border-radius: 5px 5px 0 0;
    background: linear-gradient(to top, #cccccc 0%, #d6d6d6 1px, #ebebeb 100%); 
    
    @media ${breakpoints[0]} {
      padding: 5px;
    }

    i {
        margin: 0 10px;
        font-size: ${fontSizing.xs};
        cursor: pointer;
    }
  }

  .transaction-info {
    ${flex("column", "flex-start", "center")}
    padding: 20px;

    h3 {
      margin: 10px 0;
      font-size: ${fontSizing.ml};
      letter-spacing: 0.35rem;
      color: ${colorScheme.headingColor};
    }

    input:first-child {
      margin: 10px 0;
      font-size: ${fontSizing.m};
    }
    
    .transaction-stats {
      ${flex()}
      
      & * {
        font-size: ${fontSizing.m};

        @media ${breakpoints[0]} {
          font-size: ${fontSizing.sm};
        }
      }

      .stat-category {
        font-weight: bolder;
        color: ${color.emphasis};
      }

    }

    @media ${breakpoints[0]} {
      h3 {
        font-size: ${fontSizing.m};
      }
    }
}

`;

export const Preview = styled.div`
					width: 90%;
					min-width: 300px;
					${flex("column")}
					margin: 10px 0;
					padding: 10px;
					border: 1px solid ${color.defaultBorderColor};
					border-radius: 5px;
					background: ${color.primaryBgShading};
					cursor: pointer;
          font-size: ${fontSizing.sm};
          
          &:a {
            text-decoration: none;
          }

					&:hover {
						color: ${color.lightText};
						background: ${colorScheme.defaultFontColor};
					}
				`;

export const SpinnerContainer = styled.div`
	width: 90%;
	${flex("column", "center", "center")};
	background: ${color.primaryBgShading};
`;

export const ButtonMenu = styled.nav`
	align-self: center;
	width: 80%;
	margin-top: 20px;
	display: ${props => (!props.edit ? "none" : "flex")};
	flex-direction: column;
	align-items: center;
	justify-content: center;

	button {
		width: 100px;
		font-size: ${fontSizing.m};
	}

	@media ${breakpoints[0]} {
		button {
			font-size: ${fontSizing.s};
			margin-bottom: 20px;
		}
	}
`;

export const StyledLink = styled(Link)`
					text-decoration: none;
					color: ${colorScheme.defaultFontColor};
				`;
