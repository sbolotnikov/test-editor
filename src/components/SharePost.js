import React from "react";
import { Helmet } from "react-helmet";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton,LinkedinIcon, EmailShareButton, EmailIcon} from "react-share";
function SharePost(props) {
    var socialMediaButton = {
        "&:hover > svg": {
            height: "50px !important",
            width: "50px !important",
        }
    }
    return (
        <div>
            <FacebookShareButton
                url={props.url}
                quote={props.title+'\n'+props.quote}
                hashtag={props.hashtag}
                className={socialMediaButton}
            >
                <FacebookIcon size={36} round={true}/>
            </FacebookShareButton>
            <TwitterShareButton
                url={props.url}
                title={props.title+'\n'+props.quote}
                hashtag={props.hashtag}
                className={socialMediaButton}
            >
                <TwitterIcon size={36} round={true}/>
            </TwitterShareButton>
            <WhatsappShareButton
                url={props.url}
                title={props.title+'\n'+props.quote}
                separator=":: "
                className={socialMediaButton}
            >
                <WhatsappIcon size={36} round={true}/>
            </WhatsappShareButton>

            <EmailShareButton
                url={props.url}
                subject={props.title}
                body={props.quote+'\n'}
                media={props.image}
                className={socialMediaButton}>
                <EmailIcon size={36} round={true} />
            </EmailShareButton>
        </div>
    )
}
export default SharePost;