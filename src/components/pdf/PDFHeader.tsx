import { StyleSheet, View, Text, Image } from "@react-pdf/renderer";
import { ResumeData } from "../../types/resume";

const PDFHeader = ({ resumeData }: { resumeData: ResumeData }) => {
  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
      alignItems: "center",
    },
    name: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 4,
    },
    profession: {
      fontSize: 14,
      marginBottom: 6,
      color: "#333",
    },
    contact: {
      fontSize: 10,
      color: "#666",
      marginBottom: 2,
    },
    socialMedia: {
      fontSize: 5,
      color: "#666",
    },
    socialMediaContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 10,
      marginTop: 2,
    },
    socialMediaItem: {
      marginBottom: 2,
      color: "#666",
      fontSize: 8,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginBottom: 8,
    },
  });

  return (
    <View style={styles.container}>
      {resumeData.profilePicture && (
        <Image src={resumeData.profilePicture} style={styles.image} />
      )}
      <Text style={styles.name}>{resumeData.name}</Text>
      <Text style={styles.profession}>{resumeData.position}</Text>
      <Text style={styles.contact}>
        {resumeData.email && `${resumeData.email} | `}
        {resumeData.contactInformation && `${resumeData.contactInformation} | `}
        {resumeData.address}
      </Text>
      {resumeData.socialMedia && resumeData.socialMedia.length > 0 && (
        <View style={styles.socialMediaContainer}>
          {resumeData.socialMedia.map((social, index) => (
            <Text key={index} style={styles.socialMediaItem}>
              {social.socialMedia}: {social.link}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default PDFHeader;
