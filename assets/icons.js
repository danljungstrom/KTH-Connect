import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import React from "react";

import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart'
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons/faHeart'
import { faComment } from '@fortawesome/free-regular-svg-icons/faComment'
import { faMessage } from '@fortawesome/free-regular-svg-icons/faMessage'
import { faMessage as faMessageFilled } from '@fortawesome/free-solid-svg-icons/faMessage'
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser'
import { faUser as faUserFilled } from '@fortawesome/free-solid-svg-icons/faUser'
import { faLocationDot as faLocationDotFilled } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import {colors} from "./colors";

const PostButtonIcon = ({icon}) => <FontAwesomeIcon icon={ icon } color={colors.icon} size={15}/>;
const NavBarIcon = ({icon}) => <FontAwesomeIcon icon={ icon } color={colors.icon} size={25}/>;
const ArrowIcon = ({icon}) => <FontAwesomeIcon icon={ icon } color={colors.icon} size={15}/>;

export const heartIcon = <PostButtonIcon icon={faHeart}/>
export const heartIconFilled = <PostButtonIcon icon={faHeartFilled}/>
export const commentIcon = <PostButtonIcon icon={faComment}/>

export const chatIcon = <NavBarIcon icon={faMessage}/>
export const chatIconFilled = <NavBarIcon icon={faMessageFilled}/>
export const feedIcon = <NavBarIcon icon={faHome}/>
export const feedIconFilled = <NavBarIcon icon={faHome}/>
export const profileIcon = <NavBarIcon icon={faUser}/>
export const profileIconFilled = <NavBarIcon icon={faUserFilled}/>
export const campusIcon = <NavBarIcon icon={faLocationDotFilled}/>
export const campusIconFilled = <NavBarIcon icon={faLocationDotFilled}/>
export const plusIcon = <NavBarIcon icon={faPlus}/>

export const arrowUpIcon = <ArrowIcon icon={faChevronUp}/>
export const arrowDownIcon = <ArrowIcon icon={faChevronDown}/>
