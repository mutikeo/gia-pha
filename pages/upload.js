import React, { useState, useContext }  from 'react';
import Uploady, { useItemFinishListener, useItemStartListener, useItemErrorListener } from '@rpldy/uploady';
import UploadButton from '@rpldy/upload-button';
import { store } from '../components/store';
import Layout from '../components/layout';

const CLOUD_NAME = "dag3oozxe",
  UPLOAD_PRESET = "s6cssrjr";

function UploadingInfo() {
	const [uploadUrl, setUploadUrl] = useState(false);
  const { dispatch } = useContext(store);
	useItemStartListener((item) => {
    dispatch({ type: 'SET_LOADING', loading: true });
		console.log(`item ${item.id} started uploading`);  
	});

	useItemFinishListener((item) => {
		console.log(`item ${item.id} finished uploading, response was: `, item.uploadResponse);
		if (item.uploadStatus === 200) {
			dispatch({ type: 'SET_LOADING', loading: false });
			setUploadUrl(item.uploadResponse.data.url);
		}
	});

	useItemErrorListener((item) => {
		dispatch({ type: 'SET_LOADING', loading: false });
		console.log(`item ${item.id} failed - `, item.uploadResponse);  
	});
	return (
		uploadUrl ? (
			<img
				src={uploadUrl}
				width={300}
				height='auto'
			/>
		) : null
	)
}
	
export default function Upload() {
	
  return (
		<Layout>
			<div className="upload">
				<Uploady
					destination={{
						url: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
						params: {
							upload_preset: UPLOAD_PRESET,
						},
					}}
				>
					<UploadButton />
					<UploadingInfo />
				</Uploady>
				<style>{`
					.upload button {
						height: 60px;
						width: 300px;
						font-size: 22px;
						background-color: #101a2c;
						border: 1px solid #4b5763;
						color: #b0b1b3;
						text-transform: uppercase;
						cursor: pointer;
						margin-bottom: 4px;
					}
				`}</style>
			</div>
		</Layout>
  );
}
