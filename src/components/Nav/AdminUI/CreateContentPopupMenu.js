// import React, { useState } from "react";
// import { useAuth } from "../../../contexts/AuthContext";
// // import { Link } from "react-router-dom";

// // import CreateReview from "../../Reviews/CreateReview";
// // import CreateSkill from "../../Skills/CreateSkill";
// // import CreateBlog from "../../Blog/CreateBlog";
// // import CreateGallery from "../../Gallery/CreateGallery";
// // import FeaturedSkill from "../../Profile/FeaturedSkill";

// import { navMui } from "../muiNav";
// import { withStyles } from "@material-ui/core/styles";
// import {
//   Menu,
//   Grid,
//   Paper,
//   Modal,
//   Backdrop,
//   Fade,
//   IconButton,
// } from "@material-ui/core";
// import CreateIcon from "@material-ui/icons/Create";
// import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
// import NoteAddIcon from "@material-ui/icons/NoteAdd";
// import EventAvailableIcon from "@material-ui/icons/EventAvailable";
// function CreateContentPopupMenu(props) {
//   // const { currentUser } = useAuth();
//   const { classes, contentMenuOpen, handleContentMenuClose } = props;

//   const [createSkillModelOpen, setCreateSkillModelOpen] = useState(false);
//   const handleCreateSkillModelOpen = () => {
//     setCreateSkillModelOpen(true);
//   };
//   const handleCreateSkillModelClose = () => {
//     setCreateSkillModelOpen(false);
//   };

//   const [createBlogModelOpen, setCreateBlogModelOpen] = useState(false);
//   const handleCreateBlogModelOpen = () => {
//     setCreateBlogModelOpen(true);
//   };
//   const handleCreateBlogModelClose = () => {
//     setCreateBlogModelOpen(false);
//   };

//   const [createGalleryModelOpen, setCreateGalleryModelOpen] = useState(false);
//   const handleCreateGalleryModelOpen = () => {
//     setCreateGalleryModelOpen(true);
//   };
//   const handleCreateGalleryModelClose = () => {
//     setCreateGalleryModelOpen(false);
//   };

//   const [
//     createFeaturedSKillModelOpen,
//     setCreateFeaturedSKillModelOpen,
//   ] = useState(false);
//   const handleCreateFeaturedSKillModelOpen = () => {
//     setCreateFeaturedSKillModelOpen(true);
//   };
//   const handleCreateFeaturedSKillModelClose = () => {
//     setCreateFeaturedSKillModelOpen(false);
//   };

//   return (
//     <>
//       <Menu
//         anchorEl={contentMenuOpen}
//         open={Boolean(contentMenuOpen)}
//         onClose={handleContentMenuClose}
//         onMouseLeave={handleContentMenuClose}
//         className={classes.menu}
//       >
//         <Grid container className={classes.MenuBox}>
//           <Paper
//             className={classes.MenuPaper}
//             onClick={handleCreateSkillModelOpen}
//           >
//             <IconButton className={classes.submitButton}>
//               <CreateIcon className={classes.CreateIcon} />
//             </IconButton>
//           </Paper>
//           <Paper
//             className={classes.MenuPaper}
//             onClick={handleCreateBlogModelOpen}
//           >
//             <IconButton className={classes.submitButton}>
//               <NoteAddIcon className={classes.CreateIcon} />
//             </IconButton>
//           </Paper>
//           <Paper
//             className={classes.MenuPaper}
//             onClick={handleCreateGalleryModelOpen}
//           >
//             <IconButton className={classes.submitButton}>
//               <AddAPhotoIcon className={classes.CreateIcon} />
//             </IconButton>
//           </Paper>
//           <Paper
//             className={classes.MenuPaper}
//             onClick={handleCreateFeaturedSKillModelOpen}
//           >
//             <IconButton className={classes.submitButton}>
//               <EventAvailableIcon className={classes.CreateIcon} />
//             </IconButton>
//           </Paper>
//         </Grid>
//       </Menu>
//       <Modal
//         className={classes.modal}
//         open={createSkillModelOpen}
//         onClose={handleCreateSkillModelClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={createSkillModelOpen}>
//           <div className={classes.paper}>
//             <CreateSkill
//               handleCreateSkillModelClose={handleCreateSkillModelClose}
//             />
//           </div>
//         </Fade>
//       </Modal>

//       <Modal
//         className={classes.modal}
//         open={createBlogModelOpen}
//         onClose={handleCreateBlogModelClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={createBlogModelOpen}>
//           <div className={classes.paper}>
//             <CreateBlog
//               handleCreateBlogModelClose={handleCreateBlogModelClose}
//             />
//           </div>
//         </Fade>
//       </Modal>

//       <Modal
//         className={classes.modal}
//         open={createGalleryModelOpen}
//         onClose={handleCreateGalleryModelClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={createGalleryModelOpen}>
//           <div className={classes.paper}>
//             <CreateGallery
//               handleCreateGalleryModelClose={handleCreateGalleryModelClose}
//             />
//           </div>
//         </Fade>
//       </Modal>

//       <Modal
//         className={classes.modal}
//         open={createFeaturedSKillModelOpen}
//         onClose={handleCreateFeaturedSKillModelClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={createFeaturedSKillModelOpen}>
//           <div className={classes.paper}>
//             <FeaturedSkill
//               handleCreateFeaturedSKillModelClose={
//                 handleCreateFeaturedSKillModelClose
//               }
//             />
//           </div>
//         </Fade>
//       </Modal>
//     </>
//   );
// }
// export default withStyles(navMui)(CreateContentPopupMenu);
