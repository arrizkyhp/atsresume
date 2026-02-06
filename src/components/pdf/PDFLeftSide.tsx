import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

interface PDFLeftSideProps {
  resumeData: ResumeData;
  sectionVisibility: Record<string, boolean>;
}

const PDFLeftSide = ({ resumeData, sectionVisibility }: PDFLeftSideProps) => {
  const styles = StyleSheet.create({
    section: {
      marginBottom: 12,
      pageBreakAvoid: false,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 6,
      borderBottomWidth: 2,
      borderBottomColor: '#d1d5db',
    },
    content: {
      fontSize: 12,
      marginBottom: 4,
      lineHeight: 1.4,
    },
    bold: {
      fontWeight: 'bold',
    },
    item: {
      marginBottom: 6,
    },
  });

  return (
    <View>
      {sectionVisibility.summary && resumeData.summary.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.content}>{resumeData.summary}</Text>
        </View>
      )}

      {sectionVisibility.education && resumeData.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resumeData.education.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={[styles.content, styles.bold]}>{item.degree}</Text>
              <Text style={styles.content}>{item.school}</Text>
              <Text style={styles.content}>{item.startYear} - {item.endYear}</Text>
            </View>
          ))}
        </View>
      )}

      {sectionVisibility.skills && resumeData.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {resumeData.skills.map((skillGroup, index) => (
            <View key={index} style={styles.item}>
              <Text style={[styles.content, styles.bold]}>{skillGroup.title}</Text>
              <Text style={styles.content}>{skillGroup.skills.join(', ')}</Text>
            </View>
          ))}
        </View>
      )}

      {sectionVisibility.languages && resumeData.languages.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text style={styles.content}>{resumeData.languages.join(', ')}</Text>
        </View>
      )}

      {sectionVisibility.certifications && resumeData.certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {resumeData.certifications.map((cert, index) => (
            <Text key={index} style={styles.content}>{cert}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default PDFLeftSide;