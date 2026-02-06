import { StyleSheet, View, Text, Image } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

const PDFHeader = ({ resumeData }: { resumeData: ResumeData }) => {
  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    profession: {
      fontSize: 16,
      marginBottom: 8,
      color: '#333',
    },
    contact: {
      fontSize: 12,
      color: '#666',
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {resumeData.profilePicture && (
          <Image src={resumeData.profilePicture} style={styles.image} />
        )}
        <View>
          <Text style={styles.name}>{resumeData.name}</Text>
          <Text style={styles.profession}>{resumeData.position}</Text>
          <Text style={styles.contact}>
            {resumeData.email && `${resumeData.email} | `}
            {resumeData.contactInformation && `${resumeData.contactInformation} | `}
            {resumeData.address}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PDFHeader;